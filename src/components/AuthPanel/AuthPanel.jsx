import React, { Component } from 'react';
import avaDef from '../../assets/images/avaDef.png';
import './AuthPanel.scss';

export class AuthPanel extends Component {

    render() {
        return <div className="nav-auth-panel">
            <button className="nav-auth-panel__login" onClick={this.props.onLogin}>
                <span className="login">{this.props.isLogged ? 'Logout' : 'Login'}</span>
            </button>
            <div className="nav-auth-user">
                <div className="nav-auth-user__ava">
                    <img src={this.props.isLogged ? this.props.profile.profile_image.small : avaDef} alt="A" />
                </div>
                <div className="nav-auth-user__name">
                    <span className="username">{this.props.profile.first_name}</span>
                </div>
            </div>
            
        </div>
    }

}