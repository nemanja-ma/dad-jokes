import React, { Component } from 'react';
import './SearchForm.css';

const SearchForm = props => {
    const onSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit();
    };
    return (
        <form onSubmit={onSubmit} className="search-form">
            <input type="text" placeholder="Enter search term..." onChange={event => props.onSearchValueChange(event.target.value)}></input>
            <div>
                <button
                    disabled={props.isSearching}>
                    Search
                </button>
            </div>
            <div>
                <button
                    onClick={props.onSingleSearchClick}
                    disabled={props.isSearching}>
                    Joke of the day
                </button>
            </div>
        </form>
    );
};
export default SearchForm;