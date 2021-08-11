// Main React app container
import fetch from 'node-fetch';
import React, { Component } from 'react';

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
    const museumArr = museums.map((museum) => {
      return (
        <h5>{museum.name}</h5>
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
