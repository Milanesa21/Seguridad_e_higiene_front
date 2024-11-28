import { AccessToken } from "./tokenService";
export class ApiService {
    static async request(url, method = 'GET', body=null){ {
        const authToken = AccessToken.getToken();
        const options = {
            method,
            headers: {
                ...(authToken && {Authorization: `Bearer ${authToken}`}),
            },
        };
        if (body && method !== 'GET') {
            if(body instanceof FormData){
                options.body = body;
            } else{
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorDetails = await response.json().catch(() => null);
                throw new Error(
                    errorDetails?.message || `Error: ${response.status} ${response.statusText}`
                );
            }
            return response;
        } catch (error) {
            console.error("Error en la solicitud API:", error);
            throw error;
        }
    }
}
}
