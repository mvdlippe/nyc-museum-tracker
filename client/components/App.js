// Main React app container
import fetch from 'node-fetch';
import React, { Component } from 'react';
import MuseumCard from './MuseumCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      museums: []
    }
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
        />
      );
    });

    return (
      <div>
        <h2>Hello from the react app</h2>
        {museumArr}
      </div>
    );
  }
}

export default App;
