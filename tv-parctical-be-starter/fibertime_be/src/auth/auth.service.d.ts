export declare class AuthService {
  private otps;
  requestOtp(cell_number: string): Promise<void>;
  login(cell_number: string, otp: string): Promise<{
    token: string;
    user: {
      id: string;
      cell_number: string;
      name: string;
    };
  }>;
}
