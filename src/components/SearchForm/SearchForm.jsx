import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import searchIcon from '../../assets/images/search.png';
import './SearchForm.scss';

class SearchForm extends Component {

    state = {
        value: ''
    }


    submit = (event) => {
        event.preventDefault();
        this.props.history.push(`/search/${this.state.value}`);
        
    }

    changeHandler = (event) => {
        const newValue = event.currentTarget.value;
        this.setState(() => ({value: newValue}));
    }

    render() {
        return <form action="" className="search-form" onSubmit={this.submit}>
            <input type="text" 
                    className="search-form__input" 
                    placeholder="Enter keyword to find cool photos" 
                    value={this.state.value} 
                    onChange={this.changeHandler}/>
            <button className="search-form__submit" onClick={this.submit}>
                <img className="submit-icon" src={searchIcon} alt="S"/>
            </button>
        </form>
    }
}

let SearchFormWithRouter = withRouter(SearchForm);
export { SearchFormWithRouter as SearchForm }