
import React, { Component } from 'react';
import { PhotoItem } from '../PhotoItem';
import { Delay } from '../../scripts/utils.js';

import './PhotoViewer.scss';

export class PhotoViewer extends Component {

    state = {
        photos: [],
        pageIndex: 1,
        needUpdate: false
    }

    render() {
        return <div className='photo-viewer'>
            <div className="photo-wrapper">
                {this.renderPhotos()}
            </div>
            <button className="load-more-btn" onClick={Delay(this.loadMore)}>more...</button>
        </div>
       
    }

    loadMore = () => {
        this.setState((state) => ({pageIndex: state.pageIndex + 1})
            , () => this.getPhotos());
    }

    renderPhotos() {
       return this.state.photos.map((elem, i) => <PhotoItem key={elem.id} 
                                                        photo={elem} 
                                                        isLogged={this.props.isLogged}
                                                        onLike={this.onLike}
                                                        index={i}/>)
    }

    

    componentDidMount() {
        this.getPhotos();   
      
    }
    
    getPhotos = () => {
        
    }

    onLike = () => {

    }

    

    
}
