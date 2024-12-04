import { ApiService } from "../apiService";
const URL_QUIMICA = 'http://localhost:8000/Quimica/';

export class QuimicaService {
    static async createChecklist(data, idEmpresa){
        return await ApiService.request(`${URL_QUIMICA}guardar_checklist/?id_empresa=${idEmpresa}`, 'POST', data);
    }
}