import { ApiService } from "./apiService";
const URL_IMAGE = 'http://localhost:8000/file/'


export class ImageService {
    static async getImages(id_empresa){
        return ApiService.request(`${URL_IMAGE}images/?id_empresa=${id_empresa}`);
    }
    static async deleteImage(public_id){
        return ApiService.request(`${URL_IMAGE}${public_id}`, 'DELETE');
    }
    static async uploadImage(id_empresa, image){
        return ApiService.request(`${URL_IMAGE}upload/?id_empresa=${id_empresa}`, 'POST', image);
    }
}