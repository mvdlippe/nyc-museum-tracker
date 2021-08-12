// Main React app container
import fetch from 'node-fetch';
import React, { Component } from 'react';
import MuseumCard from './MuseumCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      museums: [],
      favorites: [],
      loggedIn: '',
      user: '',
    };

    this.favClicked = this.favClicked.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
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
    if (museum.fav) museum.fav = false;
    else museum.fav = true;

    // Update the state to re-render
    this.state.museums[museumIndex] = museum;
    this.setState(this.state.museums);

    // Then, send the favorite update to the server
    fetch('/favorites', {
      method: 'POST',
      body: JSON.stringify({ 'name' : museumName }),
      headers: { 'Content-Type' : 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('favClicked ERROR: ', err));
  }

  logIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({'username' : username, 'password' : password}),
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(res => res.json())
      .then(loggedIn => {this.setState({loggedIn})})
      .catch(err => console.log('login ERROR: ', err));

    console.log('After first login fetch')
    this.state.user = username;
    this.setState({user});
    console.log('After user setstate')

    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({'username' : username}),
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(res => res.json())
      .then(museums => {return this.setState({museums})})
      .catch(err => console.log('get museums ERROR: ', err));
  }

  signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({'username' : username, 'password' : password}),
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(res => res.json())
      .then(loggedIn => {return this.setState({loggedIn})})
      .catch(err => console.log('signup ERROR: ', err));
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
      <div>
        <input id="username" name="username" type="text" placeholder="username"></input>
        <input id="password" name="password" type="password" placeholder="password"></input>
        <button onClick={() => {this.logIn()}}>Log in</button>
        <button onClick={() => {this.signUp()}}>Sign up</button>
        <span>
          {(this.state.loggedIn === '') ? '' : (this.state.loggedIn) ? 'Logged in.' : 'Incorrect username or password.'}
        </span>
        <hr></hr>
        <div id="museumContainer">
          {/* <h2>Hello from the react app</h2> */}
          {museumArr}
        </div>
      </div>
    );
  }
}

export default App;
