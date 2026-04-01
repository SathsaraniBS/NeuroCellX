import api from './api';

// Get all reports
export const getReports = async () => {
  const response = await api.get('/api/reports/');
  return response.data;
};

// Create new report
export const createReport = async (reportData) => {
  const response = await api.post('/api/reports/', reportData);
  return response.data;
};

// Delete report
export const deleteReport = async (reportId) => {
  const response = await api.delete(`/api/reports/${reportId}`);
  return response.data;
};