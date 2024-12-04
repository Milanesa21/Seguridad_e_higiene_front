import { ApiService } from "../apiService";
const URL_ELECTRICIDAD = 'http://localhost:8000/Electricidad/';

export class ElectricidadService {
    static async createChecklist(data, idEmpresa){
        return await ApiService.request(`${URL_ELECTRICIDAD}create/?id_empresa=${idEmpresa}`, 'POST', data);
    }
}