import { ApiService } from "./apiService";
const USER_URL = 'http://127.0.0.1:8000/Usuarios/';

export class UserService {
    static async login(user) {
        return await ApiService.request(`${USER_URL}login`, 'POST', user);
    }
    static async register(user){
        return await ApiService.request(`${USER_URL}createUsers`, 'POST', user);
    }
    static async getUserById(id){
        return await ApiService.request(`${USER_URL}user/${id}`);
    }
    static async getUserByEmpresa(id){
        return await ApiService.request(`${USER_URL}user/empresa/${id}`);
    }
    static async updateUser(id, user){
        return await ApiService.request(`${USER_URL}updateData${id}`, 'PUT', user);
    }
    static async deleteUser(id){
        return await ApiService.request(`${USER_URL}user/delete/${id}`, 'DELETE');
    }
    static async getUsers(){
        return await ApiService.request(`${USER_URL}user/all`);
    }
    static async chengePassword(id, password){
        return await ApiService.request(`${USER_URL}user/changePassword/${id}`, 'PATCH', password);
    }
    static async alert(){
        return await ApiService.request(`${USER_URL}alert/messages`);
    }
}