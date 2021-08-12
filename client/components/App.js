// Main React app container
import fetch from 'node-fetch';
import React, { Component } from 'react';
import MuseumCard from './MuseumCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      museums: [],
      favorites: []
    }

    this.favClicked = this.favClicked.bind(this);
  }

  favClicked(museumName) {
    // First, set the museum favorite status locally by changing state and triggering a button color change
    let museumIndex = -1;
    for (let i = 0; i < this.state.museums.length; i++) {
      if (this.state.museums[i].name === museumName) {
        museumIndex = i;
        break;
      }
    }

    const museum = { ...this.state.museums[museumIndex] };
    if (museum.hasOwnProperty('fav') && museum.fav) museum.fav = false;
    else museum.fav = true;

    this.state.museums[museumIndex] = museum;

    // Then, send the favorite update to the server
    fetch('/favorites', {
      method: 'POST',
      body: JSON.stringify({ 'name' : museumName }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('favClicked ERROR: ', err));
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((museums) => {
        return this.setState({
          museums
        })
      })
      .catch(err => console.log('App.componentDidMount: get museums ERROR: ', err));
  }

  render() {
    const { museums } = this.state;
    const museumArr = museums.map((museum, i) => {
      return (
        <MuseumCard
          key={`mus${i}`}
          info={museum}
          favClicked={this.favClicked}
        />
      );
    });

    return (
      <div id="museumContainer">
        {/* <h2>Hello from the react app</h2> */}
        {museumArr}
      </div>
    );
  }
}

export default App;
