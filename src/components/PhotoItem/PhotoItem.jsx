import React, { Component } from 'react';
import likeIcon from '../../assets/images/like32.png';
import ulikeIcon from '../../assets/images/unlike32.png';
import { withRouter } from 'react-router-dom';
import { Api } from '../../scripts/api.js';

import './PhotoItem.scss';

class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: this.props.photo.liked_by_user ? this.props.photo.liked_by_user : false,
         //   likesCount: this.props.photo.likes ? this.props.photo.likes : '-'
        }
    }
 
    render() {
        const photoPath = this.props.photo.urls ? this.props.photo.urls.small : '';
        const photoLiked = this.state.isLiked;
      //  const likesCount = this.state.likesCount;
        const avaPath = this.props.photo.user ? this.props.photo.user.profile_image.small : '';
        const username = this.props.photo.user ? this.props.photo.user.username : '';
        const fullname = this.props.photo.user ? this.props.photo.user.name : '';

        return <div className="photo-item" onClick={this.onPhotoClick}>
            <img className="photo-item__photo" src={photoPath} alt="Ph"/>
            <div className="photo-item__overlay">
                <div className="likes" onClick={this.onLikeClick}>
                    <div className="likes__icon">
                        <img src={photoLiked ? likeIcon : ulikeIcon} alt="" />
                    </div>
                   {/*  <div className="likes__count">
                        <span className="count-value">{likesCount}</span>
                    </div> */}
                </div>
                <div className="author">
                    <img src={avaPath} alt="" className="author__ava" />
                    <div className="author__name">
                        <span className="name">{username}</span>
                        <span className="fullname">{fullname}</span>
                    </div>
                </div>
            </div>
        </div>
    }

    onPhotoClick = () => {
        this.props.history.push(`/photo/${this.props.photo.id}`);
    }

    onLikeClick = async (e) => {
        e.stopPropagation();

        const photoId = this.props.photo.id;

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
                console.log(response);
                this.setState( {isLiked: response.photo.liked_by_user, 
                                 likesCount: response.photo.likes} );
                   
                if (!this.state.isLiked) {                 
                    api.deleteFromCollection(response.photo); 
                    this.props.onLike(false);
                }                             
            } else {
                let response = await api.postToAPI(`/photos/${photoId}/like`, headers);
                response = JSON.parse(response);
                this.setState( {isLiked: response.photo.liked_by_user, 
                                 likesCount: response.photo.likes} );
                if (this.state.isLiked) {  
                    //response has another structure so restore it (we need new likes data + user data) 
                    response.photo.user = this.props.photo.user;             
                    api.addToCollection(response.photo); 
                    this.props.onLike(true);
                }                                  
            }
         
           
        } catch(e) {
            console.log(e)
        } 
    }

    


}

let PhotoItemWithRouter = withRouter(PhotoItem);
export { PhotoItemWithRouter as PhotoItem }