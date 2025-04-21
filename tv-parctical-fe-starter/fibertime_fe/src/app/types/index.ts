export interface DeviceCode {
  code: string;
  device_id: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    cell_number: string;
    name: string;
  };
}

export interface ConnectionStatus {
  status: 'pending' | 'connected';
  bundle?: {
    name: string;
    speed: string;
    daysRemaining: number;
    hoursRemaining: number;
  };
}

export interface Device {
  id: string;
  code?: string;
  status: 'pending' | 'connected';
}
