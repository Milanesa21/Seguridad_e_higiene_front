import { ApiService } from "./apiService";
const URL_TASK = 'http://127.0.0.1:8000/tasks/'

export class TaskService {
    static async getTasks(idEmpresa, data){
        return ApiService.request(`${URL_TASK}${idEmpresa}/${data}`)
    }
    static async createTask(task){
        return ApiService.request(`${URL_TASK}`, 'POST', task)
    }
    static async deleteTask(id){
        return ApiService.request(`${URL_TASK}${id}`, 'DELETE')
    }
    static async updateTask(id, task){
        return ApiService.request(`${URL_TASK}${id}/complete`, 'PATCH', task)
    }
    static async getAllTasks(idEmpresa){
        return ApiService.request(`${URL_TASK}${idEmpresa}`)
    }
}