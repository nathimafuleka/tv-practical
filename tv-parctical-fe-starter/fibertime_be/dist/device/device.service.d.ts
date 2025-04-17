import { HttpException } from '@nestjs/common';
import { Device } from 'src/db/entities/device.entity';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private readonly deviceRepo;
    constructor(deviceRepo: Repository<Device>);
    createDeviceCode(mac_address: string): Promise<{
        code: string;
    }>;
    getDevice(deviceCode: string, client_id: number): Promise<HttpException | {
        success: boolean;
        device: Device;
    }>;
    connectDevice(deviceId: number, client_id: number): Promise<HttpException | {
        success: boolean;
        device: Device;
        bundle: {
            active: boolean;
            expiry: string;
        };
    }>;
    deviceConnection(deviceId: number, client_id: number): Promise<HttpException | {
        success: boolean;
        device: Device;
        bundle: {
            active: boolean;
            expiry: string;
        };
    }>;
    private generateCode;
}
