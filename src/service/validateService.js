const VALIDATE_URL = 'http://127.0.0.1:8000/auth/validate/';
import { ApiService } from "./apiService";

export class ValidateService{
    static async validateToken(){
        return ApiService.request(`${VALIDATE_URL}token`, 'POST');
    }
}