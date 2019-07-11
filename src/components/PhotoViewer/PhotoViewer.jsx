
import React, { Component } from 'react';
import { PhotoItem } from '../PhotoItem';
import { Delay } from '../../scripts/utils.js';
import './PhotoViewer.scss';

export class PhotoViewer extends Component {

    state = {
        photos: [],
        pageIndex: 1
    }

    render() {
        return <div className='photo-viwer'>
            {this.renderPhotos()}
            <button className="load-more-btn" onClick={Delay(this.loadMore)}>more...</button>
        </div>
        
    }

    loadMore = () => {
        this.setState((state) => ({pageIndex: state.pageIndex + 1})
            , () => this.getPhotos());
    }

    renderPhotos() {
       return this.state.photos.map(elem => <PhotoItem photo={elem}/>)
    }

    componentDidMount() {
        this.getPhotos();   
    }
    
    getPhotos = () => {
        
    }

    

    
}