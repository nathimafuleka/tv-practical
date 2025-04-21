import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private otps: Map<string, string> = new Map();

  private validateSAPhoneNumber(phone: string): boolean {
    // South African phone number format: +27 XX XXX XXXX or 0XX XXX XXXX
    const saPhoneRegex = /^(\+27|0)\d{9}$/;
    return saPhoneRegex.test(phone.replace(/\s/g, ''));
  }

  private generateOTP(): string {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async requestOtp(cell_number: string): Promise<void> {
    // Remove any spaces from the phone number
    const cleanNumber = cell_number.replace(/\s/g, '');

    if (!this.validateSAPhoneNumber(cleanNumber)) {
      throw new BadRequestException('Invalid South African phone number format. Use +27 or 0 followed by 9 digits');
    }

    // Generate a unique 6-digit OTP
    const otp = this.generateOTP();
    this.otps.set(cleanNumber, otp);

    // In a real app, you'd send this via SMS
    console.log(`OTP for ${cleanNumber}: ${otp}`);
  }

  async login(cell_number: string, otp: string): Promise<{ token: string; user: { id: string; cell_number: string; name: string } }> {
    const cleanNumber = cell_number.replace(/\s/g, '');
    const storedOtp = this.otps.get(cleanNumber);

    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    // Clear the OTP after successful login
    this.otps.delete(cleanNumber);

    return {
      token: 'mock_token_' + Math.random().toString(36).substring(7),
      user: {
        id: '1',
        cell_number: cleanNumber,
        name: 'Test User'
      }
    };
  }
}
