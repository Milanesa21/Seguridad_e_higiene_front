import { ApiService } from "./apiService";
export class SectorService {
    static endpoints = {
      Agropecuario: 'http://127.0.0.1:8000/Agropecuario/estadisticas_por_seccion',
      Construccion: 'http://127.0.0.1:8000/Construccion/estadisticas_por_seccion',
      Electricidad: 'http://127.0.0.1:8000/Electricidad/estadisticas_por_seccion',
      Quimica: 'http://127.0.0.1:8000/Quimica/estadisticas_por_seccion',
    };
    static endpointsStats = {
      Agropecuario: 'http://127.0.0.1:8000/Agropecuario/estadisticas/',
      Construccion: 'http://127.0.0.1:8000/Construccion/estadisticas/',
      Electricidad: 'http://127.0.0.1:8000/Electricidad/estadisticas/',
      Quimica: 'http://127.0.0.1:8000/Quimica/estadisticas/',
    }
    static async getEstadisticas(sector, idEmpresa) {
      const url = `${this.endpoints[sector]}/${idEmpresa}`;
      return await ApiService.request(url);
    }
    static async getEstadisticaAgro(idEmpresa){
      const url = `${this.endpointsStats.Agropecuario}${idEmpresa}`;
      return await ApiService.request(url);
    }
    static async getEstadisticaConst(idEmpresa){
      const url = `${this.endpointsStats.Construccion}${idEmpresa}`;
      return await ApiService.request(url);
    }
    static async getEstadisticaElec(idEmpresa){
      const url = `${this.endpointsStats.Electricidad}${idEmpresa}`
      return await ApiService.request(url);
    }
    static async getEstadisticaQuim(idEmpresa){
      const url = `${this.endpointsStats.Quimica}${idEmpresa}`
      return await ApiService.request(url);
    }
  }
  