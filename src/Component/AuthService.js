import decode from 'jwt-decode';


class Authservice{
    constructor(domain){
        this.domain = domain || `http://localhost:8080`;
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
    login(username, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            console.log(res.token);
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }
    fetch(url, options){
        const headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }


        if(this.loggedIn()){
            headers['Authorization'] =  `Bearer ${this.getToken()}`
        }
            

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }
    
    setToken(idToken){
        localStorage.setItem('id_token', idToken);
    }

     getToken(){
        return localStorage.getItem('id_token');
    }
   
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }
    isTokenExpired(token){
        try{
            const decode = decode(token);
            if(decode.export < Date.now() / 1000){
                return true
            }
            else{
                return false
            }
        }
        catch(e){
            return false;
        }
    }
    logout(){
        localStorage.removeItem('id_token')
    }

    getProfile(){
        return decode(this.getToken());
    }

    _checkStatus(response){
        if(response.status >=200 && response.status < 300)
            return response;
        else{
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}

export default Authservice;