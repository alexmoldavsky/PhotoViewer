import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchForm } from '../SearchForm';
import { AuthPanel } from '../AuthPanel';
import './Nav.scss';

export class Nav extends Component {
    

    render() {

        return <nav className="nav">
            <div className="nav-main">
                <div className="nav-main__logo">U</div>
                <div className="nav-main__search">
                    <SearchForm />
                </div>
                <ul className="nav-main__menu">
                    <li className="nav-item"><Link to="/">Home</Link></li>
                    <li className="nav-item"><Link to="/favorites">Favorites</Link></li>
                    <li className="nav-item"><Link to="/about">About</Link></li>
                </ul>
            </div>
            <div className="nav-auth">
                <AuthPanel isLogged={this.props.isLogged} 
                            profile={this.props.profile}     
                            onLogin={this.props.onLogin}/>
            </div>

        </nav>
    }
}