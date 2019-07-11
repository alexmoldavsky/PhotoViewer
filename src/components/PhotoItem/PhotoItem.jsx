import React, { Component } from 'react';

export class PhotoItem extends Component {
    render() {
        return <div className="photo-viwer__photo-item">
            <img className="photo" src={this.props.photo.urls.small} alt="Ph"/>
            <div className="photo-overlay">
                <div className="like-icon">
                    <img src="" alt={this.props.photo.liked_by_user ? 'Liked' : 'Not liked'}/>
                </div>
                <div className="likes-count">
                    <span className="likes-count__value">{this.props.photo.likes}</span>
                </div>
            </div>
        </div>
    }
}