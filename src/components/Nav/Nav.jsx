import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchForm } from '../SearchForm';
import { AuthPanel } from '../AuthPanel';
import { withRouter } from 'react-router-dom';
import './Nav.scss';

class Nav extends Component {
    
    state = {
        buttonActive: false
    }

    render() {

        const buttonClass = this.state.buttonActive ? 'nav-main__button active' : 'nav-main__button';
        const menuClass = this.state.buttonActive ? 'nav-main__menu expanded' : 'nav-main__menu';

        return <nav className="nav">
            <div className="nav-main">
                <div className={buttonClass} onClick={this.onMenuButtonClick}><span className="span"></span></div>
                <div className="nav-main__logo" onClick={this.onLogoClick}>V</div>
                <div className="nav-main__search">
                    <SearchForm />
                </div>
                <ul className={menuClass}>
                    <li className="nav-item">
                        <NavLink exact={true} className="nav-item__link" activeClassName="nav-item__link active" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item__link" activeClassName="nav-item__link active" to="/favorites">Favorites</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item__link" activeClassName="nav-item__link active" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item nav-auth">
                        <AuthPanel isLogged={this.props.isLogged}
                            profile={this.props.profile}
                            onLogin={this.props.onLogin} />

                    </li>    

                </ul>
            </div>


        </nav>
    }

    onLogoClick = () => {
        this.props.history.push('/');
    }

    onMenuButtonClick = () => {
        this.setState({buttonActive: !this.state.buttonActive});
    }
}

let NavWithRouter = withRouter(Nav);
export { NavWithRouter as Nav }