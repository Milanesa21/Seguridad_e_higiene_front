export class ApiService {
    static async request(url, method = 'GET', body=null){ {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        return response.json();
    }

}
}
