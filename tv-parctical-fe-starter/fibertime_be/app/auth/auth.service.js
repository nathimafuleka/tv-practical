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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const client_otp_entity_1 = require("../db/entities/client-otp.entity");
const client_entity_1 = require("../db/entities/client.entity");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(clientOtpRepo, clientRepo, jwtService) {
        this.clientOtpRepo = clientOtpRepo;
        this.clientRepo = clientRepo;
        this.jwtService = jwtService;
    }
    async requestOtp(cell_number) {
        let client = await this.clientRepo.findOne({ where: { cell_number } });
        if (!client) {
            client = new client_entity_1.Client();
            client.cell_number = cell_number;
            await this.clientRepo.save(client);
        }
        const otp = Math.floor(100000 + Math.random() * 100000);
        const client_otp = new client_otp_entity_1.Client_OTP();
        client_otp.client_id = client.id;
        client_otp.code = otp.toString().substring(0, 4);
        client_otp.expiry = moment().add(5, 'minutes').toISOString();
        await this.clientOtpRepo.save(client_otp);
        console.log(`OTP ${client_otp.code} has been sent to ${client.cell_number}.`);
        return otp;
    }
    async login(cell_number, otp) {
        const client = await this.clientRepo.findOne({ where: { cell_number } });
        if (!client) {
            return new common_1.HttpException('login.invalid_otp', 403);
        }
        const clientOtp = await this.clientOtpRepo
            .createQueryBuilder()
            .where('client_id = :client_id and code = :otp and expiry > :expiry', {
            client_id: client.id,
            otp,
            expiry: moment().toISOString(),
        })
            .getOne();
        if (!clientOtp) {
            return new common_1.HttpException('login.invalid_otp', 403);
        }
        return {
            success: true,
            token: this.jwtService.sign(JSON.stringify({
                id: client.id,
                role: 'client',
            })),
            refresh_token: this.jwtService.sign(JSON.stringify({
                id: client.id,
                role: 'client',
            })),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_otp_entity_1.Client_OTP)),
    __param(1, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map