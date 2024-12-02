import { ApiService } from "../apiService";
const URL_AGROPECUARIO = 'http://localhost:8000/Agropecuario/';

export class AgropecuarioService {
    static async createChecklist(data, idEmpresa){
        return await ApiService.request(`${URL_AGROPECUARIO}create/?id_empresa=${idEmpresa}`, 'POST', data);
    }
}