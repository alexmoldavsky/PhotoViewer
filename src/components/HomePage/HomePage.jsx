import { PhotoViewer } from '../PhotoViewer';
import { Api } from '../../scripts/api.js';

export class HomePage extends PhotoViewer {

      getPhotos = async () => {
       
        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + localStorage.getItem('unsplshToken')
        }

        const api = new Api();
        try {
           const response = await api.getFromAPI(`/photoss?page=${this.state.pageIndex}`, headers);
           this.setState( {photos: this.state.photos.concat(JSON.parse(response))} );
        } catch(e) {
            console.log(e)
        } 
    } 

/*      getPhotos = () => {
       
        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + localStorage.getItem('unsplshToken')
        }

        const api = new Api();
        api.getFromAPI(`/photos?page=${this.state.pageIndex}`, headers
        ).then(
            (response) => {
                this.setState( {photos: this.state.photos.concat(JSON.parse(response))} )
                

        }).catch(
            (error, message) => {
                console.log(error+' '+message);
            }
        );
    }  */
   
}