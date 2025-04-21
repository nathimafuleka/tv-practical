import axios from 'axios';
import { DeviceCode, AuthResponse, ConnectionStatus, Device } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Add request interceptor
api.interceptors.request.use(request => {
  console.log('Request:', {
    method: request.method,
    url: request.url,
    params: request.params,
    data: request.data
  });
  return request;
});

// Add response interceptor
api.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        params: error.config?.params,
        data: error.config?.data
      }
    });
    return Promise.reject(error);
  }
);

export const deviceApi = {
  createDeviceCode: async (mac_address: string): Promise<DeviceCode> => {
    const response = await api.post('/api/device/create-device-code', { mac_address });
    return response.data;
  },

  getDevice: async (code: string): Promise<Device> => {
    const response = await api.get('/api/device/device', { params: { code } });
    return response.data;
  },

  connectDevice: async (device_id: string): Promise<Device> => {
    const response = await api.post('/api/device/connect-device', { device_id });
    return response.data;
  },

  getConnectionStatus: async (device_id: string): Promise<ConnectionStatus> => {
    const response = await api.get('/api/device/connection-status', { params: { device_id } });
    return response.data;
  },
};

export const authApi = {
  requestOtp: async (phoneNumber: string): Promise<void> => {
    await api.post('/api/auth/request-otp', { cell_number: phoneNumber });
  },

  getCurrentOtp: async (): Promise<{ phone: string; otp: string } | null> => {
    const response = await api.get('/api/auth/current-otp');
    return response.data;
  },

  login: async (phoneNumber: string, otp: string): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', { cell_number: phoneNumber, otp });
    return response.data;
  },
};
