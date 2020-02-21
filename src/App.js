import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/navigation/Logo';
import ImageLinkForm from './components/navigation/ImageLinkForm';
import Rank from './components/navigation/Rank';

const params={
  "particles": {
      "number": {
          "value": 75
      },
      "size": {
          "value": 5
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={params}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
