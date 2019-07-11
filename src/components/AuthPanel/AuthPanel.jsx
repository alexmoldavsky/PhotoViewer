import React, { Component } from 'react';

export class AuthPanel extends Component {

    render() {
        return <div>
            <div className="nav-auth__ava"><img src={this.props.isLogged ? this.props.profile.profile_image.small : ''} alt="A"/></div>
            <div className="nav-auth__username">
                <span className="username">{this.props.profile.first_name}</span>
            </div>
            <button className="nav-auth__login" onClick={this.props.onLogin}>
                <span className="login">{this.props.isLogged ? 'Logout' : 'Login'}</span>
            </button>
        </div>
    }

}