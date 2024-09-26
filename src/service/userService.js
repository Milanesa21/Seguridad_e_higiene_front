import { ApiService } from "./apiService";
const USERURL = 'http://127.0.0.1:8000/Usuarios/';

export class UserService {
    static async login(user) {
        return ApiService.request(`${USERURL}login`, 'POST', user);
    }
    static async register(user){
        return ApiService.request(`${USERURL}register`, 'POST', user);
    }
    static async getUserById(id){
        return ApiService.request(`${USERURL}user/id/${id}`, 'GET');
    }
    static async updateUser(id, user){
        return ApiService.request(`${USERURL}user/update/${id}`, 'PUT', user);
    }
    static async deleteUser(id){
        return ApiService.request(`${USERURL}user/delete/${id}`, 'DELETE');
    }
    static async getUsers(){
        return ApiService.request(`${USERURL}users`);
    }
}