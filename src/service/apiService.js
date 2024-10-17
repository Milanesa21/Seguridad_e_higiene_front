import { AccessToken } from "./tokenService";
export class ApiService {
    static async request(url, method = 'GET', body=null){ {
        const authToken = AccessToken.getToken();
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(authToken && {Authorization: `Bearer ${authToken}`}),
            },
        };
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.error("Error en la solicitud API:", error);
            throw error;
        }
    }
}
}
