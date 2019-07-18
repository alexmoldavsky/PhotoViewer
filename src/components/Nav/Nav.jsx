import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchForm } from '../SearchForm';
import { AuthPanel } from '../AuthPanel';
import { withRouter } from 'react-router-dom';
import './Nav.scss';

class Nav extends Component {
    

    render() {

        return <nav className="nav">
            <div className="nav-main">
                <div className="nav-main__logo" onClick={this.onLogoClick}>U</div>
                <div className="nav-main__search">
                    <SearchForm />
                </div>
                <ul className="nav-main__menu">
                    <li className="nav-item">
                        <NavLink exact={true} className="nav-item__link" activeClassName="nav-item__link active" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item__link" activeClassName="nav-item__link active" to="/favorites">Favorites</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item__link" activeClassName="nav-item__link active" to="/about">About</NavLink>
                    </li>
                </ul>
            </div>
            <div className="nav-auth">
                <AuthPanel isLogged={this.props.isLogged} 
                            profile={this.props.profile}     
                            onLogin={this.props.onLogin}/>
            </div>

        </nav>
    }

    onLogoClick = () => {
        this.props.history.push('/');
    }
}

let NavWithRouter = withRouter(Nav);
export { NavWithRouter as Nav }