import { HttpException } from '@nestjs/common';
import { DeviceService } from './device.service';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    createDevice(mac_address: string): Promise<{
        code: string;
    }>;
    deviceByCode(req: any, deviceCode: string): Promise<HttpException | {
        success: boolean;
        device: import("../db/entities/device.entity").Device;
    }>;
    connectDevice(req: any, deviceId: string): Promise<HttpException | {
        success: boolean;
        device: import("../db/entities/device.entity").Device;
        bundle: {
            active: boolean;
            expiry: string;
        };
    }>;
    deviceConnectionStatus(req: any, deviceId: string): Promise<HttpException | {
        success: boolean;
        device: import("../db/entities/device.entity").Device;
        bundle: {
            active: boolean;
            expiry: string;
        };
    }>;
    private getUserToken;
}
