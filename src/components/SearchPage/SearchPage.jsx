import { PhotoViewer } from '../PhotoViewer';
import { Api } from '../../scripts/api.js';

export class SearchPage extends PhotoViewer {

    getPhotos = async (replacePhotos = false) => {

        const api = new Api();

        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + api.token;
        }

        try {
            const response = await api.getFromAPI(`/search/photos?page=${this.state.pageIndex}&query=${this.props.match.params.query}`, headers);
            if (replacePhotos) {
                this.setState( {photos: JSON.parse(response).results} );
            } else this.setState( {photos: this.state.photos.concat(JSON.parse(response).results)} );
        } catch(e) {
            console.log(e);
        }
        
    }

    //reloading photos after search route or auth status changed
     componentDidUpdate(prevProps) {
        
        if ((prevProps.location.pathname !== this.props.location.pathname) || 
           (prevProps.isLogged !== this.props.isLogged)) {
            this.getPhotos(true); 
        } 
        
    } 
    
}