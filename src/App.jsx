import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from './components/Nav';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { Api } from './scripts/api.js';
import './App.scss';


export class App extends Component {

    state = {
        isLogged: false,
        profile: {},
    }
    
    render() {
        return <Router>
            <div className="page">
                <header className="header">
                    <Nav isLogged={this.state.isLogged} 
                        profile={this.state.profile}                        
                        onLogin={this.onLogin}
                    />
                </header>
                <main>
                    <Switch>
                        <Route exact={true} path="/" render={props => <HomePage {...props} 
                                                                            isLogged={this.state.isLogged}
                                                                        />} />
                        <Route path="/search/:query" render={props => <SearchPage {...props} 
                                                                            isLogged={this.state.isLogged}
                                                                        />} />
                        <Route path="/favorites" component={() => <h2 style={{color: 'black'}}>Favorites page!</h2>} />
                        <Route path="/about" component={() => <h2 style={{color: 'black'}}>About page!</h2>} />
                        <Route path="/404" component={() => <h1 style={{color: 'black'}}>Not found!!</h1>} />
                        <Redirect to="/404" />
                    </Switch>
                </main>
            </div>
        </Router>
    }  

    componentDidMount() {
        this.checkAuth();
    }

    onLogin = () => {
        if (this.state.isLogged) {
            localStorage.removeItem('unsplshToken');
            this.setState({isLogged: false, profile: {}});
        } else {
            const api = new Api();
            api.login();
        }
        
    }

    checkAuth = () => {

        const headers = {};
        const token = localStorage.getItem('unsplshToken');

        if (token) {
            //trying to access server with saved token
            headers.Authorization = 'Bearer ' + token;
            const api = new Api();
            api.getFromAPI('/me', headers
            ).then(
                (response) => {
                    //yes, we logged
                    this.setState({ isLogged: true, profile: JSON.parse(response) });


                }).catch(
                    (error) => {
                        //token or network is not ok - removing auth info
                        console.log(error);
                        localStorage.removeItem('unsplshToken');
                        this.setState({isLogged: false, profile: {}});
                       // this.onLogin();
                    },
                );
        } else this.getToken();
    }

    getToken() {

        const getTokenFromURL = () => {
            let res = window.location.href;
            res = res.match(/code=([a-z0-9]+)(#|&|\/)/i);
            if (res && res.length > 1) {
               console.log(res); 
               return res[1]
            }
        }

        //looking for token in current url 
        const authCode = getTokenFromURL();
        if (authCode) {
            const api = new Api();
            api.postCodeToGetToken(authCode).then(
            (response) => {
                //saving new token and then checking
                localStorage.setItem('unsplshToken', JSON.parse(response).access_token);
                this.checkAuth();
                console.log('token saved');
            }).catch(
                (error) => {
                    console.log(error);
                },
            );
        } else console.log('can\'t get token');
    }
 
    
    

}


