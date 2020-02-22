import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/navigation/Logo';
import ImageLinkForm from './components/navigation/ImageLinkForm';
import Rank from './components/navigation/Rank';



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
      box: {}
    }
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

//Fetch the data from the API, calculate the detection box on the image and set the state of the box
onSubmit = () => {
  this.setState({imageurl: this.state.input});
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
        .then(response => this.displayFacebox(this.calculateFaceLocation(response)))
        .catch(error => console.log('Error with the CLarifai API', error));
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={params}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onSubmit = {this.onSubmit} onInputChange = {this.onInputChange}/>
        {console.log(this.state.box)}
        <FaceRecognition box = {this.state.box} imageurl = {this.state.imageurl}/>
      </div>
    );
  }
}

export default App;
