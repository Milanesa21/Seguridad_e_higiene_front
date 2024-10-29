import { ApiService } from "./apiService";
const URL_PERMISOS = 'http://localhost:8000/permiso/role'

export class PermisosService {
    static async getPermisos(){
        return ApiService.request(`${URL_PERMISOS}/getPermissions`);
    }
    static async addPermiso(permiso){
        return ApiService.request(`${URL_PERMISOS}/addPermission`, 'POST', permiso);
    }
    static async deletePermiso(permiso){
        return ApiService.request(`${URL_PERMISOS}/deletePermission`, 'PATCH', permiso);
    }
}