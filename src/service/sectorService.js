import { ApiService } from "./apiService";
export class SectorService {
    static endpoints = {
      Agropecuario: 'http://127.0.0.1:8000/Agropecuario/estadisticas_por_seccion',
      Construccion: 'http://127.0.0.1:8000/Construccion/estadisticas_por_seccion',
      Electricidad: 'http://127.0.0.1:8000/Electricidad/estadisticas_por_seccion',
      Quimica: 'http://127.0.0.1:8000/Quimica/estadisticas_por_seccion',
    };
  
    static async getEstadisticas(sector, idEmpresa) {
      const url = `${this.endpoints[sector]}/${idEmpresa}`;
      return ApiService.request(url);
    }
  }
  