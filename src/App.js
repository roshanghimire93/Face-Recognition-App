import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



// initialize with your api key. This will also work in your browser via http://browserify.org/
//initialized the face detection API with the apiKey
const app = new Clarifai.App({
 apiKey: '00513f0e128947d585f3d6e09d54598a'
});

//Declared the parameter for the dynamic background
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
  constructor(){
    super()
    this.state = {
      input: '',
      imageurl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  //Load the active user after signin or register
  loadUser = (userData) => {
    this.setState({user:{
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }
    })
  }

  //calculate the face detection box for the image. data is the response from the api
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     //const clarifaiFace = data.outputs[0].data.regions.map(faces => faces.region_info.bounding_box);
    // console.log(clarifaiFace)
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

//set the state with the calculated face detection box
displayFacebox = (box) => {
  this.setState({
    box: box
  });
}

//Receive the input from the url textbox
onInputChange = (event) => {
  this.setState({
    input: event.target.value
  });
}

//Change the routes in the application
onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState({
      isSignedIn: false,
      route: 'signin'
    })
  }
  else if(route === 'home'){
    this.setState({
      isSignedIn: true,
      route: route
    })
  }
  else if (route === 'register'){
    this.setState({
      isSignedIn: false,
      route: route
    })
  }

  else if (route === 'signin'){
    this.setState({
      isSignedIn: false,
      route: route
    })
  }
}

//Fetch the data from the API, calculate the detection box on the image and set the state of the box
onPictureSubmit = () => {
  this.setState({imageurl: this.state.input});
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      //Update the user entries to the server
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState(Object.assign(this.state.user, {entries: data.entries}))
          })
      }
      this.displayFacebox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log('Error with the CLarifai API', error));
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={params}/>
        <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' ?
          <div>
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onPictureSubmit = {this.onPictureSubmit} onInputChange = {this.onInputChange}/>
            <FaceRecognition box = {this.state.box} imageurl = {this.state.imageurl}/>
          </div>
          : (this.state.route === 'signin') ? 
            <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;