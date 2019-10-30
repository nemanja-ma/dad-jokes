import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            joke: null,
            isFetchingJoke: false
        };

        this.onTellJoke = this.onTellJoke.bind(this);
    }

componentDidMount() {
    this.fetchJoke();
}

    fetchJoke() {
        this.setState({isFetchingJoke: true});

        fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ 
                    joke: json.joke,
                    isFetchingJoke: false 
                });
            });
    };

onTellJoke () {
    this.fetchJoke();
}

    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Enter search term..."></input>
                    <button> Search </button>
                    <button 
                    onClick={this.onTellJoke} 
                    disabled={this.state.isFetchingJoke}
                    > 
                    Tell me a joke
                    </button>
                </form>
                
                <p>{this.state.isFetchingJoke ? 'Loading joke...' : this.state.joke}</p>
            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


