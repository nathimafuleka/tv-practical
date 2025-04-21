export declare class DeviceService {
  private devices;
  createDeviceCode(mac_address: string): Promise<{ code: string; device_id: string }>;
  getDevice(code: string): Promise<{ id: string; code: string; status: 'pending' | 'connected' }>;
  connectDevice(device_id: string): Promise<{ id: string; code: string; status: 'pending' | 'connected' }>;
  getConnectionStatus(device_id: string): Promise<{ status: 'pending' | 'connected' }>;
}
