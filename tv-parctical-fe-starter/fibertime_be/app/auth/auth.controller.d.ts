import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestOtp(cell_number: string): Promise<number>;
    login(cell_number: string, otp: string): Promise<import("@nestjs/common").HttpException | {
        success: boolean;
        token: string;
        refresh_token: string;
    }>;
}
