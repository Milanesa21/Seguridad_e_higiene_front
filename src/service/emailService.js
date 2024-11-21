import { ApiService } from "./apiService";
const EMAIL_URL = 'http://localhost:8000/email/'
export class EmailService {
    static async createCompany(data){
        return await ApiService.request(`${EMAIL_URL}`, 'POST', data);
    }
    static async recuperationPassword(email){
        return await ApiService.request(`${EMAIL_URL}reperacion/`, 'POST', email);
    }
}