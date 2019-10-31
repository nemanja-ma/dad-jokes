import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/SearchForm'; 

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            searchTerm: "",
            isFetchingJoke: false,
            jokes: []
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.searchJokes = this.searchJokes.bind(this);
    }

    searchJokes(limit = 20) {
        this.setState({ isFetchingJoke: true });

        fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                const jokes = json.results;
                this.setState({
                    jokes,
                    isFetchingJoke: false
                })
            });
    };

    onSearchChange(value) {
        this.setState({ searchTerm : value })
     }

    render() {
        return (
            <div>
                <SearchForm 
                onFormSubmit={this.searchJokes}
                onSearchValueChange={this.onSearchChange}
                isSearching={this.state.isFetchingJoke}
                onSingleSearchClick={() => this.searchJokes(1)}
                />
                <ul>{this.state.isFetchingJoke ? 'Loading joke...' : this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}</ul>
            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


