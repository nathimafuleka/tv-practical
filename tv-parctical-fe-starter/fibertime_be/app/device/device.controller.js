"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    createDevice(mac_address) {
        return this.deviceService.createDeviceCode(mac_address);
    }
    deviceByCode(req, deviceCode) {
        const user = this.getUserToken(req);
        if (!user.id || user.role != 'client') {
            throw new common_1.HttpException('login.access_denied', 403);
        }
        return this.deviceService.getDevice(deviceCode, user.id);
    }
    connectDevice(req, deviceId) {
        const user = this.getUserToken(req);
        if (!user.id || user.role != 'client') {
            throw new common_1.HttpException('login.access_denied', 403);
        }
        return this.deviceService.connectDevice(Number(deviceId), user.id);
    }
    deviceConnectionStatus(req, deviceId) {
        const user = this.getUserToken(req);
        if (!user.id || user.role != 'client') {
            throw new common_1.HttpException('login.access_denied', 403);
        }
        return this.deviceService.connectDevice(Number(deviceId), user.id);
    }
    getUserToken(req) {
        let token = req.headers.authorization;
        if (!token) {
            throw new common_1.HttpException('login.access_denied', 403);
        }
        token = token.replace('Bearer ', '');
        let user = {
            id: null,
            role: 'none',
        };
        try {
            user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        }
        catch (ex) {
            console.log(ex);
            throw new common_1.HttpException('login.access_denied', 403);
        }
        return user;
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Post)('create-device-code'),
    __param(0, (0, common_1.Body)('mac_address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "createDevice", null);
__decorate([
    (0, common_1.Get)('device'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('device-code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "deviceByCode", null);
__decorate([
    (0, common_1.Post)('connect-device'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('device-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "connectDevice", null);
__decorate([
    (0, common_1.Get)('connection-status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('device-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "deviceConnectionStatus", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map