import { PhotoViewer } from '../PhotoViewer';
import { Api } from '../../scripts/api.js';

export class FavoritesPage extends PhotoViewer {

    getPhotos = () => {
        
        const api = new Api();
        this.setState( {photos: this.state.photos.concat(api.getCollection(this.state.pageIndex)), 
                        needUpdate: false} );


    } 

    onLike = (active) => {
        if (!active) {
            this.setState( {photos: [], needUpdate: true} );
        }
    }

    componentDidUpdate() {
        if (this.state.needUpdate) {
            this.getPhotos();
        }
    }
  
}