import React, { Component } from 'react';
import likeIcon from '../../assets/images/like32.png';
import ulikeIcon from '../../assets/images/unlike32.png';
import './PhotoModal.scss';
import { Api } from '../../scripts/api.js';

export class PhotoModal extends Component {

    state = {
        photo: {},
        isLiked: false,
        likesCount: '-'
    }

    render() {
        const avaPath = this.state.photo.user ? this.state.photo.user.profile_image.small : '';
        const username = this.state.photo.user ? this.state.photo.user.username : '';
        const fullname = this.state.photo.user ? this.state.photo.user.name : '';
        const description = this.state.photo.description && this.state.photo.description !== null 
                            ? this.state.photo.description 
                            : this.state.photo.alt_description;
        const photoLiked = this.state.isLiked;                            
        const likesCount = this.state.likesCount;
        const photoPath = this.state.photo.urls ? this.state.photo.urls.regular : '-';

        return <div className="photo-modal-overlay" onClick={this.onClose}>
            <div className="close_bnt" onClick={this.onClose}></div>
            <div className="photo-modal-view">
                <div className="details-panel">
                    <div className="details-panel__photo-info">
                        <div className="author">
                            <img src={avaPath} alt="" className="author__ava"/>
                            <div className="author__name">
                                <span className="name">{username}</span>
                                <span className="fullname">{fullname}</span>
                            </div>
                        </div>
                        <h3 className="description">{description}</h3>
                    </div>
                    <div className="details-panel__likes">
                        <div className="likes-count">
                            <span className="count-value">{likesCount}</span>
                        </div>
                        <div className="likes-icon" onClick={this.onLikeClick}>
                            <img src={photoLiked ? likeIcon : ulikeIcon} alt="" />
                        </div>
                       
                    </div>
                </div>
                <div className="photo-panel">
                    <div className="photo-wrapper">
                        <img className="photo-wrapper__photo" src={photoPath} alt="Ph" />
                    </div>
                </div>
            </div>
        </div>

    } 

    componentDidMount() {
        this.getPhoto();
    }

    getPhoto = async () => {
        const photoId = this.props.match.params.id;
      
        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + localStorage.getItem('unsplshToken')
        }

        const api = new Api();
        try {
           let response = await api.getFromAPI(`/photos/${photoId}`, headers);
           response = JSON.parse(response);
           this.setState( {photo: response, 
                            isLiked: response.liked_by_user, 
                            likesCount: response.likes} );
           
        } catch(e) {
            console.log(e)
        }
    }

    onLikeClick = async () => {

        const photoId = this.props.match.params.id;

        const api = new Api();
      
        const headers = {};
        if (this.props.isLogged) {
            headers.Authorization = 'Bearer ' + api.token
        }

        
        try {
            if (this.state.isLiked) {
                //unlike photo if liked
                let response = await api.deleteToAPI(`/photos/${photoId}/like`, headers);
                response = JSON.parse(response);
                this.setState({
                    isLiked: response.photo.liked_by_user,
                    likesCount: response.photo.likes
                });
                if (!this.state.isLiked) {                 
                    api.deleteFromCollection(response.photo); 
                }  
            } else {
                let response = await api.postToAPI(`/photos/${photoId}/like`, headers);
                response = JSON.parse(response);
                this.setState({
                    isLiked: response.photo.liked_by_user,
                    likesCount: response.photo.likes
                });
                if (this.state.isLiked) {    
                    //response has another structure so restore it (we need new likes data + user data) 
                    response.photo.user = this.state.photo.user;               
                    api.addToCollection(response.photo); 
                }  
            }
           
           
        } catch(e) {
            console.log(e)
        } 
    }

    onClose = (e) => {
        if (e.target !== e.currentTarget){
            return;
        }
        this.props.history.goBack();
    }

}