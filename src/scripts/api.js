const serverSettings = {
    accessKey: '346e102023bddc455f1023e8a1604671b6194576c97ca6ab35e547dc89ec7da8',
    secretKey: '1792aadb481dabf05ec0e01916fef2003d17c8b0214f0cec04087df4e14e122f',
    apiDomain: 'https://api.unsplash.com',
    authURL: 'https://unsplash.com/oauth/authorize',
    tokenURL: 'https://unsplash.com/oauth/token',
    authRedirectUrl: 'http://localhost:3000',
    authScope: 'public+read_user+write_likes'
}


export class Api {

    getFromAPI(path, headers = {}) {
         if (!headers.Authorization) {
            headers.Authorization = 'Client-ID ' + serverSettings.accessKey;
        } 

        return this.request(serverSettings.apiDomain, path, 'GET', headers, {})
    }

    postToAPI(path, headers = {}, content) {
        if (!headers.Authorization) {
            headers.Authorization = 'Client-ID ' + serverSettings.accessKey;
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        return this.request(serverSettings.apiDomain, path, 'POST', headers, content)
    }

    deleteToAPI(path, headers = {}, content) {
        if (!headers.Authorization) {
            headers.Authorization = 'Client-ID ' + serverSettings.accessKey;
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json; charset=utf-8';
        }

        return this.request(serverSettings.apiDomain, path, 'DELETE', headers, content)
    }

    request(domain, path, method, headers, content) {
        
        
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, domain + path);

            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key])
            }

            xhr.send(content);

            const stateChangeHandler = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 || xhr.status < 300) {
                        resolve(xhr.response);
                    } else reject(xhr.status+' '+JSON.parse(xhr.responseText).errors);

                    
                }
            }

            xhr.addEventListener('readystatechange', stateChangeHandler);

        }
        );
    }

    login() {
        const loginUri = serverSettings.authURL + `?client_id=${serverSettings.accessKey}&redirect_uri=${serverSettings.authRedirectUrl}&response_type=code&scope=${serverSettings.authScope}`;
        window.open(loginUri, '_blank');
    }


    postCodeToGetToken(authorizationCode) {
        const headers = {'Content-Type': 'application/json; charset=utf-8'};
        const content = {};
        let contentJSON = '';

        content.client_id = serverSettings.accessKey;
        content.client_secret = serverSettings.secretKey;
        content.redirect_uri = serverSettings.authRedirectUrl;
        content.code = authorizationCode;
        content.grant_type = 'authorization_code';
       
        contentJSON = JSON.stringify(content);         
        return this.request(serverSettings.tokenURL, '', 'POST', headers, contentJSON)
    }

    set token(token) {
        if (token) {
            localStorage.setItem('unsplshToken', token);
        }
    }

    get token() { return localStorage.getItem('unsplshToken'); }

    deleteToken() {
        localStorage.removeItem('unsplshToken');
    }

    addToCollection(photo) {
        if (photo) {
            const collection = this.getCollection();
            if (!collection.find((savedPhoto) => savedPhoto.id === photo.id)) {
                localStorage.setItem('unsplshCollection', JSON.stringify(collection.concat(photo)));
            }
        }
    }

    deleteFromCollection(photo) {
        if (photo) {
            localStorage.setItem('unsplshCollection', JSON.stringify(this.getCollection().filter((savedPhoto) => savedPhoto.id !== photo.id)));
        }
    }

    getCollection(page, itemsPerPage = 10) {
 
        let collection = [];
        const storage = localStorage.getItem('unsplshCollection');
         
        if (storage) {

            collection = JSON.parse(storage);
            if (page >= 1) {
                //load array by parts
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                collection = collection.slice(start, end);

            }
        }
     //   console.log(collection);
        return collection;
    }



}