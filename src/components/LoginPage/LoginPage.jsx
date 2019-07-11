import React, { Component } from 'react';
import { Api } from '../../scripts/api.js';

export class LoginPage extends Component {
    render() {
        return <h1 style={{color: 'black'}}>User authorization...</h1>
    } 

    componentDidMount() {
        this.getToken();
    }

    getToken() {
        const authCode = this.props.location.query.code;
        if (authCode) {
        const api = new Api();
        api.postCodeToGetToken(authCode).then(
            (response) => {
                localStorage.setItem('unsplshToken', JSON.parse(response).access_token);
                this.props.onLogged();
                this.props.history.push('/');
            }).catch(
                (error) => {
                    console.log(error);
                },
            );
        }
    }
}
