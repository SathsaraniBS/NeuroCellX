# convert_b0006.py
# Run this script to convert NASA B0006.mat to CSV
# Usage: python convert_b0006.py

import scipy.io
import pandas as pd
import numpy as np
import os

print("Loading B0006.mat file...")

# ─────────────────────────────────────────
# Load the .mat file
# ─────────────────────────────────────────
mat = scipy.io.loadmat('B0006.mat')
battery = mat['B0006']
cycles  = battery['cycle'][0][0][0]

print(f"Total cycles found: {len(cycles)}")

# ─────────────────────────────────────────
# Extract discharge cycles only
# ─────────────────────────────────────────
records = []
discharge_cycle_num = 0

INITIAL_CAPACITY = 2.0353  # From NASA B0006 first cycle

for i, cycle in enumerate(cycles):
    try:
        cycle_type = str(cycle['type'][0])

        if cycle_type != 'discharge':
            continue

        discharge_cycle_num += 1
        data = cycle['data'][0][0]

        voltage_arr     = data['Voltage_measured'][0].flatten()
        current_arr     = data['Current_measured'][0].flatten()
        temperature_arr = data['Temperature_measured'][0].flatten()
        time_arr        = data['Time'][0].flatten()

        # Get capacity if available
        try:
            capacity = float(data['Capacity'][0].flatten()[0])
        except:
            capacity = None

        # Calculate SOH
        if capacity:
            soh = round((capacity / INITIAL_CAPACITY) * 100, 2)
        else:
            soh = None

        # Calculate RUL
        EOL_CYCLE = 102  # Cycle where SOH drops below 70%
        rul = max(0, EOL_CYCLE - discharge_cycle_num)

        # Add each time step as a row
        for j in range(len(voltage_arr)):
            records.append({
                'cycle_count':  discharge_cycle_num,
                'time':         round(float(time_arr[j]), 4),
                'voltage':      round(float(voltage_arr[j]), 6),
                'current':      round(float(current_arr[j]), 6),
                'temperature':  round(float(temperature_arr[j]), 4),
                'capacity':     round(capacity, 6) if capacity else None,
                'soh':          soh,
                'rul':          rul,
            })

    except Exception as e:
        print(f"Skipping cycle {i}: {e}")
        continue

# ─────────────────────────────────────────
# Create DataFrame and save to CSV
# ─────────────────────────────────────────
df = pd.DataFrame(records)

print(f"\n✅ Extracted {len(df)} rows from {discharge_cycle_num} discharge cycles")
print(f"Columns: {list(df.columns)}")
print(f"\nFirst 3 rows:")
print(df.head(3))

# Save full dataset
output_file = 'NASA_B0006_battery_data.csv'
df.to_csv(output_file, index=False)
print(f"\n✅ Saved to: {output_file}")
print(f"File size: {round(os.path.getsize(output_file)/1024, 2)} KB")

# Save small sample (first 500 rows for quick testing)
sample_file = 'NASA_B0006_sample.csv'
df.head(500).to_csv(sample_file, index=False)
print(f"✅ Sample saved to: {sample_file} (500 rows for testing)")
