const LOCA_STORE_KEY = 'token';

export class AccessToken {
    static setToken(token) {
        AccessToken.token = token;
        window.localStorage.setItem(LOCA_STORE_KEY, token);
    }
    static getToken(){
        return window.localStorage.getItem(LOCA_STORE_KEY)
    }
    static removeToken(){
        window.localStorage.removeItem(LOCA_STORE_KEY);
    }
    
}