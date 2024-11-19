import { ApiService } from "./apiService";
export class SectorService {
    static endpoints = {
      Agropecuario: 'http://127.0.0.1:8000/Agropecuario/estadisticas',
      Construccion: 'http://127.0.0.1:8000/Construccion/estadisticas',
      Electricidad: 'http://127.0.0.1:8000/Electricidad/estadisticas',
      Quimica: 'http://127.0.0.1:8000/Quimica/estadisticas',
    };
  
    static async getEstadisticas(sector, idEmpresa) {
      const url = `${this.endpoints[sector]}/${idEmpresa}`;
      return ApiService.request(url);
    }
  }
  