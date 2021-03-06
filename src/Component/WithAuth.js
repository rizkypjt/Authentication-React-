import React from 'react';
import AuthService from './AuthService';



function WithAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component{
        constructor(){
            super();
            this.state = {
                user:null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                // console.log('PROPSt',this.props);
                this.props.history.replace('/login');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    })
                }
                catch(err){
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }
        render(){
            if(this.state.user){
                return(
                    <AuthComponent 
                        {...this.props} 
                        {...this.state} 
                    />
                )
            }else{
                return null;
            }
        }
    }
}

export default WithAuth;