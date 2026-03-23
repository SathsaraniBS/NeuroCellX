import React, { useState, useEffect, useRef } from 'react';
import { useNavigate }   from 'react-router-dom';
import { useAuth }       from '../../contexts/AuthContext';
import { useToast }      from '../../contexts/ToastContext';
import api               from '../../services/api';
import {
  Upload, Database, Trash2, Eye,
  CheckCircle, AlertTriangle, Clock,
  FileText, LogOut, LayoutDashboard,
  ChevronDown, X
} from 'lucide-react';

const EngineerDashboard = () => {
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const navigate          = useNavigate();
  const fileInputRef      = useRef(null);

  // ── State ──────────────────────────────
  const [activeTab, setActiveTab]       = useState('upload');
  const [datasets, setDatasets]         = useState([]);
  const [uploading, setUploading]       = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [previewData, setPreviewData]   = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver]         = useState(false);
  const [showPreview, setShowPreview]   = useState(false);

  // ── Fetch datasets ─────────────────────
  const fetchDatasets = async () => {
    try {
      const res = await api.get('/api/datasets/list');
      setDatasets(res.data.datasets || []);
    } catch (err) {
      addToast('Failed to load datasets', 'error');
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  // ── Handle file select ─────────────────
  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      addToast('Only CSV files are allowed!', 'error');
      return;
    }
    setSelectedFile(file);
    setUploadResult(null);
  };

  // ── Handle drag and drop ───────────────
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // ── Upload dataset ─────────────────────
  const handleUpload = async () => {
    if (!selectedFile) {
      addToast('Please select a CSV file first!', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('uploaded_by', user.id);

    try {
      const res = await api.post('/api/datasets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUploadResult(res.data);
      addToast('Dataset uploaded successfully!', 'success');
      setSelectedFile(null);
      fetchDatasets();

    } catch (err) {
      const msg = err.response?.data?.detail || 'Upload failed';
      addToast(msg, 'error');
      setUploadResult({ error: msg });
    } finally {
      setUploading(false);
    }
  };

  // ── Preview dataset ────────────────────
  const handlePreview = async (datasetId) => {
    try {
      const res = await api.get(`/api/datasets/${datasetId}/preview`);
      setPreviewData(res.data);
      setShowPreview(true);
    } catch (err) {
      addToast('Failed to load preview', 'error');
    }
  };

  // ── Delete dataset ─────────────────────
  const handleDelete = async (datasetId, name) => {
    if (!window.confirm(`Delete dataset "${name}"?`)) return;
    try {
      await api.delete(`/api/datasets/${datasetId}`);
      addToast('Dataset deleted!', 'success');
      fetchDatasets();
    } catch (err) {
      addToast('Failed to delete dataset', 'error');
    }
  };

  // ── Status badge color ─────────────────
  const statusBadge = (status) => {
    const styles = {
      'Uploaded':    'bg-blue-500/20   text-blue-400',
      'Validated':   'bg-green-500/20  text-green-400',
      'Processed':   'bg-purple-500/20 text-purple-400',
      'Used in Model': 'bg-cyan-500/20 text-cyan-400',
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  // ── Logout ─────────────────────────────
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">

      {/* ══════ SIDEBAR ══════ */}
      <aside className="w-64 bg-[#0b1220]/80 border-r border-cyan-500/20 flex flex-col p-6">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-1">
          VoltIQ
        </h1>
        <p className="text-xs text-gray-500 mb-6">Engineer Panel</p>

        {/* User info */}
        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm font-medium truncate">
            {user?.name || user?.email}
          </p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
            Engineer
          </span>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1">
          {[
            { id: 'upload',  label: 'Upload Dataset', icon: <Upload size={18} /> },
            { id: 'history', label: 'Dataset History', icon: <Database size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/40 text-cyan-300'
                  : 'hover:bg-white/5 text-gray-400'}`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}

          {/* Back to Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 transition-all"
          >
            <LayoutDashboard size={18} />
            <span className="text-sm">Main Dashboard</span>
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold text-sm hover:opacity-90 transition"
        >
          Log Out
        </button>
      </aside>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="flex-1 p-8 overflow-auto">

        {/* ══════ UPLOAD TAB ══════ */}
        {activeTab === 'upload' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                Upload Dataset <span className="text-cyan-400">📂</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Upload EV battery CSV datasets for ML model training.
              </p>
            </div>

            {/* Required columns info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-6">
              <p className="text-blue-300 text-sm font-medium mb-2">
                ✅ Required CSV Columns:
              </p>
              <div className="flex flex-wrap gap-2">
                {['voltage', 'current', 'temperature', 'cycle_count'].map((col) => (
                  <span
                    key={col}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-mono"
                  >
                    {col}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Optional: soh, soc, rul, current_a, voltage_measured
              </p>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all mb-6
                ${dragOver
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : selectedFile
                    ? 'border-green-400 bg-green-500/10'
                    : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5'
                }`}
            >
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {selectedFile ? (
                <div>
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <p className="text-green-400 font-semibold text-lg">
                    {selectedFile.name}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div>
                  <Upload size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">
                    Drag & Drop CSV file here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    or click to browse files
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Max file size: 50MB
                  </p>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Uploading & Validating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload size={20} /> Upload Dataset
                </span>
              )}
            </button>

            {/* Upload Result */}
            {uploadResult && !uploadResult.error && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={20} className="text-green-400" />
                  <h3 className="text-green-400 font-semibold">
                    Upload Successful!
                  </h3>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[
                    { label: 'File Name', value: uploadResult.metadata?.name },
                    { label: 'Rows',      value: uploadResult.metadata?.rows },
                    { label: 'Columns',   value: uploadResult.metadata?.columns },
                    { label: 'File Size', value: uploadResult.metadata?.file_size },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-gray-400 text-xs">{item.label}</p>
                      <p className="text-white font-semibold mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Column names */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Detected Columns:</p>
                  <div className="flex flex-wrap gap-2">
                    {uploadResult.metadata?.col_names?.map((col) => (
                      <span
                        key={col}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-mono"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {uploadResult.metadata?.warnings?.length > 0 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4">
                    <p className="text-yellow-400 text-sm font-medium mb-1">
                      ⚠️ Data Quality Warnings:
                    </p>
                    {uploadResult.metadata.warnings.map((w, i) => (
                      <p key={i} className="text-yellow-300 text-xs">• {w}</p>
                    ))}
                  </div>
                )}

                {/* Preview Table */}
                {uploadResult.preview?.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">
                      Data Preview (first 10 rows):
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-white/5">
                            {Object.keys(uploadResult.preview[0]).map((col) => (
                              <th
                                key={col}
                                className="p-2 text-left text-gray-400 font-mono"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {uploadResult.preview.map((row, i) => (
                            <tr
                              key={i}
                              className="border-t border-white/5 hover:bg-white/5"
                            >
                              {Object.values(row).map((val, j) => (
                                <td key={j} className="p-2 text-gray-300">
                                  {String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upload Error */}
            {uploadResult?.error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-400" />
                  <p className="text-red-400 font-medium">Upload Failed</p>
                </div>
                <p className="text-red-300 text-sm mt-1">{uploadResult.error}</p>
              </div>
            )}
          </div>
        )}

        {/* ══════ HISTORY TAB ══════ */}
        {activeTab === 'history' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                Dataset History <span className="text-cyan-400">📋</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                All uploaded datasets — {datasets.length} total
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {datasets.length === 0 ? (
                <div className="text-center py-16">
                  <Database size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No datasets uploaded yet.</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/30 transition"
                  >
                    Upload First Dataset
                  </button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm">
                      <th className="p-4 text-left">Dataset Name</th>
                      <th className="p-4 text-left">Rows</th>
                      <th className="p-4 text-left">Columns</th>
                      <th className="p-4 text-left">Size</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Uploaded By</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasets.map((ds) => (
                      <tr
                        key={ds.id}
                        className="border-t border-white/10 hover:bg-white/5 transition text-sm"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-cyan-400" />
                            <span className="font-medium">{ds.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">
                          {ds.row_count?.toLocaleString()}
                        </td>
                        <td className="p-4 text-gray-400">{ds.col_count}</td>
                        <td className="p-4 text-gray-400">{ds.file_size} KB</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(ds.status)}`}>
                            {ds.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">
                          {ds.uploaded_by_name || 'Unknown'}
                        </td>
                        <td className="p-4 text-gray-400">
                          {ds.created_at
                            ? new Date(ds.created_at).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePreview(ds.id)}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                              title="Preview"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(ds.id, ds.name)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ══════ PREVIEW MODAL ══════ */}
      {showPreview && previewData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">

            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-semibold">{previewData.name}</h3>
                <p className="text-gray-400 text-sm">
                  {previewData.row_count?.toLocaleString()} total rows
                </p>
              </div>
              <button onClick={() => setShowPreview(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="overflow-auto p-6">
              <p className="text-gray-400 text-sm mb-3">
                Showing first 20 rows:
              </p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5">
                    {previewData.columns?.map((col) => (
                      <th
                        key={col}
                        className="p-2 text-left text-cyan-400 font-mono whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.preview?.map((row, i) => (
                    <tr key={i} className="border-t border-white/5">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="p-2 text-gray-300 whitespace-nowrap">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerDashboard;