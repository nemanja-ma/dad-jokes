import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            searchTerm: "",
            isFetchingJoke: false,
            jokes: []
        };

        this.onTellJoke = this.onTellJoke.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSerachSubmit = this.onSerachSubmit.bind(this);
    }

    searchJoke() {
        this.setState({ isFetchingJoke: true });

        fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                const jokes = json.results;
                console.log(jokes);
                this.setState({
                    jokes,
                    isFetchingJoke: false
                })
            });
    };

    onTellJoke() {
        this.searchJoke();
    }

    onSearchChange(event) {
        this.setState({ searchTerm : event.target.value })
     }

    onSerachSubmit(event){
        event.preventDefault();
        this.searchJoke();
}

    render() {
        return (
            <div>
                <form onSubmit={this.onSerachSubmit} >
                    <input type="text" placeholder="Enter search term..." onChange={this.onSearchChange}></input>
                    <button> Search </button>
                    <button
                        onClick={this.onTellJoke}
                        disabled={this.state.isFetchingJoke}>
                        Tell me a joke
                    </button>
                </form>

                <ul>{this.state.isFetchingJoke ? 'Loading joke...' : this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}</ul>

            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


