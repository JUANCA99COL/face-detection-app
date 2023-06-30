import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/logo';
import Signin from './components/SignIn/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import React, { Component } from 'react';
// import Clarifai from 'clarifai';


    // ADD OWN API FROM CLARIFAI 
    // const app = new Clarifai.App({
    //   apiKey: '8b74b23b5e27427faae047afd9c1aa49'
    // });
    const returnClarifaiRequestOptions = (imageUrl) => {
    const USER_ID = 'jqj03gegfkp9';       
    const APP_ID = 'test';
    const IMAGE_URL = imageUrl;
    const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 7200123360f6405cab5f4234340b4512'
      },
      body: raw
    };

      return requestOptions
  }

class App extends Component {
  constructor() {
    super();
    this.state = {
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
  }

  loadUser = (data) => {
    this.setState({
      user: {
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
  this.setState({ input: event.target.value });
} 

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
    // app.models.predict('face-detection', returnClarifaiRequestOptions(this.state.input))
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, returnClarifaiRequestOptions(this.state.input))
    .then(response => {
      // console.log('hi', response);
      if (response) {
        fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
         })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
    }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
    .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

render () {
  const { isSignedIn, imageUrl, route, box } = this.state;
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
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
         )
        }
      </div>
    );
  }
}

export default App;