import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client_OTP } from 'src/db/entities/client-otp.entity';
import { Client } from 'src/db/entities/client.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly clientOtpRepo;
    private readonly clientRepo;
    private readonly jwtService;
    constructor(clientOtpRepo: Repository<Client_OTP>, clientRepo: Repository<Client>, jwtService: JwtService);
    requestOtp(cell_number: string): Promise<number>;
    login(cell_number: string, otp: string): Promise<HttpException | {
        success: boolean;
        token: string;
        refresh_token: string;
    }>;
}
