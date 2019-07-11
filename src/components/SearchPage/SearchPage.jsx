import { PhotoViewer } from '../PhotoViewer';
import { Api } from '../../scripts/api.js';

export class SearchPage extends PhotoViewer {

    getPhotos = (nextProps, replacePhotos = false) => {

        const api = new Api();

        const currProps = (nextProps) ? nextProps : this.props;

        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + localStorage.getItem('unsplshToken')
        }

        api.getFromAPI(`/search/photos?page=${this.state.pageIndex}&query=${currProps.match.params.query}`, headers
        ).then(
            (response) => {
                if (replacePhotos) {
                    this.setState( {photos: JSON.parse(response).results} );
                } else this.setState( {photos: this.state.photos.concat(JSON.parse(response).results)} );
                
                

        }).catch(
            (error) => {
                console.log(error);
            },
        );
        
    }

    //for component rerender after search route changed
     componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.getPhotos(nextProps, true); 
        }
        
    }

    

    

    
}