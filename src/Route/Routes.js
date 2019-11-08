import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from '../App';
import Login from '../Component/Login';

class Routes extends Component {
    render() {
        return (
            <Router>
                    <Route path="/" exact component={App} />
                    <Route path="/login" component={Login} />
            </Router>
        );
    }
}

export default Routes;