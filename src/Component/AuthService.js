import decode from 'jwt-decode';

class Authservice{
    constructor(domain){
        this.domain = domain || `http://localhost:8080`;
    }
    login(username, password){
        return this.fetch(`$f{this.domain}/login`,{
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }).then(res => {
                this.setToken(res.token);
                return Promise.resolve(res);
            })
        })
    }
    fetch(url, options){
        const header = {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }

        if(this.loggedIn())
            header['Authorization'] =  `Bearer ${this.getToken()}`

        return fetch(url, {
            header,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }

    getToken(){
        return localStorage.getItem('id_token');
    }
    setToken(idToken){
        return localStorage.setItem('id_token', idToken);
    }
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }
    isTokenExpired()
}

export default Authservice;