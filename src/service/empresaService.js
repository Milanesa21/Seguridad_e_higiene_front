import { ApiService } from "./apiService";
const URL_EMPRESA = 'http://127.0.0.1:8000/empresas/'

export class EmpresaService {
    static async login(empresa){
        return ApiService.request(`${URL_EMPRESA}login`, 'POST', empresa)
    }
    static async regitro(empresa){
        return ApiService.request(`${URL_EMPRESA}registrar`, 'POST', empresa)
    }
    static async getById(id){
        return ApiService.request(`${URL_EMPRESA}empresa/${id}`, 'GET')
    }
    static async delete(id){
        return ApiService.request(`${URL_EMPRESA}${id}`, 'DELETE')
    }
    static async update(id,empresa){
        return ApiService.request(`${URL_EMPRESA}${id}`,'PUT', empresa)
    }
}