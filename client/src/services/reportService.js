import api from './api';

//  Get all reports 
export const getReports = async () => {
  const response = await api.get('/api/reports/');


  const data = response.data;
  if (Array.isArray(data)) {
    return { reports: data };
  }
  return data; // already { reports: [...] } format
};

//  Create new report 
export const createReport = async (reportData) => {
  const response = await api.post('/api/reports/', reportData);
  return response.data;
};

//  Delete report 
export const deleteReport = async (reportId) => {
  const response = await api.delete(`/api/reports/${reportId}`);
  return response.data;
};

//  Update report (Edit) 
export const updateReport = async (reportId, reportData) => {
  const response = await api.put(`/api/reports/${reportId}`, reportData);
  return response.data;
};