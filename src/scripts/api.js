
export class Api {
    constructor() {
        this._serverSettings = {
            accessKey: '346e102023bddc455f1023e8a1604671b6194576c97ca6ab35e547dc89ec7da8',
            secretKey: '1792aadb481dabf05ec0e01916fef2003d17c8b0214f0cec04087df4e14e122f',
            apiDomain: 'https://api.unsplash.com',
            authURL: 'https://unsplash.com/oauth/authorize',
            tokenURL: 'https://unsplash.com/oauth/token',
            authRedirectUrl: 'http://localhost:3000',
            authScope: 'public+read_user'
        }
    }

    get serverSettings() { return this._serverSettings; }

    getFromAPI(path, headers = {}) {
        if (!headers.Authorization) {
            headers.Authorization = 'Client-ID ' + this._serverSettings.accessKey;
        }

        return this.request(this._serverSettings.apiDomain, path, 'GET', headers, {})
    }

    postToAPI(path, headers = {}, content) {
        if (!headers.Authorization) {
            headers.Authorization = 'Client-ID ' + this._serverSettings.accessKey;
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        return this.request(this._serverSettings.apiDomain, path, 'POST', headers, content)
    }

    request(domain, path, method, headers, content) {
        
        
        return new Promise((onSuccess, onError) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, domain + path);

            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key])
            }

            xhr.send(content);

            const stateChangeHandler = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        onError(xhr.status+' '+JSON.parse(xhr.responseText).errors);
                    }

                    onSuccess(xhr.response);
                }
            }

            xhr.addEventListener('readystatechange', stateChangeHandler);

        }
        );
    }

    login() {
        const loginUri = this._serverSettings.authURL + `?client_id=${this._serverSettings.accessKey}&redirect_uri=${this._serverSettings.authRedirectUrl}&response_type=code&scope=${this._serverSettings.authScope}`;
        window.open(loginUri, '_blank');
    }


    postCodeToGetToken(authorizationCode) {
        const headers = {'Content-Type': 'application/json; charset=utf-8'};
        const content = {};
        let contentJSON = '';

        content.client_id = this._serverSettings.accessKey;
        content.client_secret = this._serverSettings.secretKey;
        content.redirect_uri = this._serverSettings.authRedirectUrl;
        content.code = authorizationCode;
        content.grant_type = 'authorization_code';
       
        contentJSON = JSON.stringify(content);         
        return this.request(this._serverSettings.tokenURL, '', 'POST', headers, contentJSON)
    }



}