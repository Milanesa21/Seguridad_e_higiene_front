import { AccessToken } from "./tokenService";
export class ApiService {
    static async request(url, method = 'GET', body=null){ {
        const authToken = AccessToken.getToken();
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        };
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        return response;
    }
}
}
