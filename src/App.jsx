import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from './components/Nav';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { FavoritesPage } from './components/FavoritesPage';
import { AboutPage } from './components/AboutPage';
import { PhotoModal } from './components/PhotoModal';


import { Api } from './scripts/api.js';
import './App.scss';


export class App extends Component {

    state = {
        isLogged: false,
        userID: '',
        profile: {},
        lastLocation: ''
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
                <main className="main"> 
                    <Switch>
                        <Route exact={true} path="/" render={(props) => <HomePage {...props} 
                                                                            isLogged={this.state.isLogged}
          
                                                                        />} />
                        <Route path="/search/:query" render={(props) => <SearchPage {...props} 
                                                                            isLogged={this.state.isLogged}
                                  
                                                                        />} />
                        <Route path="/photo/:id" render={(props) => <PhotoModal {...props} 
                                                                            isLogged={this.state.isLogged}
                                                                         
                                                                        />} />                       
                        <Route path="/favorites" render={(props) => <FavoritesPage {...props} 
                                                                            isLogged={this.state.isLogged}
                                                                        />} />
                        <Route path="/about" component={AboutPage} />
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
        const api = new Api();
        if (this.state.isLogged) {
            api.deleteToken();
            this.setState({isLogged: false, profile: {}});
        } else {
            api.login();
        }
        
    }

    checkAuth = async () => {

        const headers = {};
        const api = new Api();

        const token = api.token;

        if (token) {
            //trying to access server with saved token
            headers.Authorization = 'Bearer ' + token;
            
            try {
                const response = await api.getFromAPI('/me', headers);
                //yes, we logged
                this.setState({ isLogged: true, 
                                profile: JSON.parse(response) 
                            });
            } catch (e) {
                //token or network is not ok - removing auth info
                console.log(e);
                api.deleteToken();
                this.setState({ isLogged: false, profile: {} });
                // this.onLogin();
            };
            

        } else this.getToken();
    }

    getToken = async () => {

        const getTokenFromURL = () => {
            let res = window.location.href;
            res = res.match(/code=([a-z0-9]+)(#|&|\/)/i);
            if (res && res.length > 1) {
               return res[1]
            }
        }

        //looking for token in current url 
        const authCode = getTokenFromURL();
        if (authCode) {
            const api = new Api();
            try {
                const response = await api.postCodeToGetToken(authCode);
                //saving new token and then checking
                api.token = JSON.parse(response).access_token;
                console.log('token saved');
            } catch(e) {
                console.log(e);
            }
            
            this.checkAuth();
            
            
        } else console.log('can\'t get token');
    }
 

}


