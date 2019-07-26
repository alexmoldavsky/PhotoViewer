import { PhotoViewer } from '../PhotoViewer';
import { Api } from '../../scripts/api.js';

export class HomePage extends PhotoViewer {

      getPhotos = async (replacePhotos = false) => {
       
        const headers = {};
        const api = new Api();

        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + api.token
        } 

        
        try {
            const response = await api.getFromAPI(`/photos?page=${this.state.pageIndex}`, headers);
            if (replacePhotos) {
                this.setState( { photos: JSON.parse(response) }  );
            } else this.setState( { photos: this.state.photos.concat(JSON.parse(response)) } );


        } catch (e) {
            console.log(e)
        } 
    } 

    //reloading photos after auth status changed
    componentDidUpdate(prevProps) {
       

        if (prevProps.isLogged !== this.props.isLogged) {
            this.getPhotos(true); 
        }
        
    }
  
}
