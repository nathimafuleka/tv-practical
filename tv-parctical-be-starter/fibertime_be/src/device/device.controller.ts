import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('create-device-code')
  async createDeviceCode(@Body() body: { mac_address: string }) {
    return this.deviceService.createDeviceCode(body.mac_address);
  }

  @Get('device')
  async getDevice(@Query('code') code: string) {
    return this.deviceService.getDevice(code);
  }

  @Post('connect-device')
  async connectDevice(@Body() body: { device_id: string }) {
    return this.deviceService.connectDevice(body.device_id);
  }

  @Get('connection-status')
  async getConnectionStatus(@Query('device_id') device_id: string) {
    return this.deviceService.getConnectionStatus(device_id);
  }
}
