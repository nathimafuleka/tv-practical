import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeviceService {
  private devices = new Map<string, { id: string; code: string; status: 'pending' | 'connected'; lastUpdated: number }>();

  private generateAlphanumericCode(): string {
    // Generate a random 4-character alphanumeric code
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding confusing characters like 0,1,I,O
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async createDeviceCode(mac_address: string) {
    const code = this.generateAlphanumericCode();
    const device_id = `device_${mac_address}`;
    // When creating a new device, always set it to pending
    this.devices.set(code, { id: device_id, code, status: 'pending', lastUpdated: Date.now() });
    return { code, device_id };
  }

  async getDevice(code: string) {
    const device = this.devices.get(code);
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async connectDevice(device_id: string) {
    for (const [code, device] of this.devices.entries()) {
      if (device.id === device_id) {
        // Update the device status to connected and timestamp
        device.status = 'connected';
        device.lastUpdated = Date.now();
        return device;
      }
    }
    throw new NotFoundException('Device not found');
  }

  async getConnectionStatus(device_id: string) {
    for (const [code, device] of this.devices.entries()) {
      if (device.id === device_id) {
        // Check if the connection has timed out (30 seconds)
        const now = Date.now();
        if (device.status === 'connected' && now - device.lastUpdated > 30000) {
          device.status = 'pending';
        }

        // Return the current device status
        return {
          status: device.status,
          bundle: device.status === 'connected' ? {
            name: 'Premium Package',
            speed: '100 Mbps',
            daysRemaining: 30,
            hoursRemaining: 0
          } : null
        };
      }
    }
    throw new NotFoundException('Device not found');
  }
}
