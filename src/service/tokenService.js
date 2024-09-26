const LOCA_STORE_KEY = 'token';

export class AccessToken {
    static token = window.localStorage.getItem(LOCA_STORE_KEY);

    static setToken(token) {
        AccessToken.token = token;
        window.localStorage.setItem(LOCA_STORE_KEY, token);
    }
    static getToken(){
        return this.token;
    }
    static removeToken(){
        window.localStorage.removeItem(LOCA_STORE_KEY);
    }
    
}