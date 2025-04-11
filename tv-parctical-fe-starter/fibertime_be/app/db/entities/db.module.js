"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_otp_entity_1 = require("./client-otp.entity");
const client_entity_1 = require("./client.entity");
const device_entity_1 = require("./device.entity");
let DBModule = class DBModule {
};
exports.DBModule = DBModule;
exports.DBModule = DBModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST ?? 'fibertime-db',
                port: Number(process.env.DATABASE_PORT) ?? 5432,
                username: process.env.DATABASE_USER ?? 'root',
                password: process.env.DATABASE_PASSWORD ?? 'root',
                database: process.env.DATABASE_NAME ?? 'fibertime',
                synchronize: true,
                entities: [client_entity_1.Client, client_otp_entity_1.Client_OTP, device_entity_1.Device],
            }),
            typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client, client_otp_entity_1.Client_OTP, device_entity_1.Device]),
        ],
    })
], DBModule);
//# sourceMappingURL=db.module.js.map