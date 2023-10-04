import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/navigation/navigation';
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/logo';
import Loader from './components/Logo/loader';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: `${process.env.API_CLARIFAI}`
 });

const initialState = {
  input: '',
      imageUrl: '',
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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict({ 
      id: "face-detection",
    }, this.state.input )
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://login-app-api-ap19.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route} 
    ); 
  }

render () {
  const { isSignedIn, imageUrl, route, box } = this.state;
  <Loader/>
    return (
      <div className="App">
        <ParticlesBg  
            type="cobweb"
            color="#7C24CC" 
            num={200}
            bg={true}
            style={{
              position: "absolute",
              zIndex: -1,
              top: 0,
              left: 0
            }}
            />
             <Navigation 
             isSignedIn={isSignedIn} 
             onRouteChange={this.onRouteChange} />
            { this.state.route === 'home' 
          ? <div> 
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}
              /> 
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
          route === 'signin' ?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />           
         ) 
        }
      </div>
    );
  }
}

export default App;