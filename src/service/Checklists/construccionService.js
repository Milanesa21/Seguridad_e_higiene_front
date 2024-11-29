import { ApiService } from "../apiService";
const URL_CONSTRUCCION = 'http://localhost:8000/Construccion/';

export class ConstruccionService {
    static async createChecklist(data, idEmpresa){
        return await ApiService.request(`${URL_CONSTRUCCION}guardar_checklist/?id_empresa=${idEmpresa}`, 'POST', data);
    }
}