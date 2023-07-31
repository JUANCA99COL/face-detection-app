import './signin.css';
import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail : '',
            signInPassword : ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://login-app-api-ap19.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
          if(user.id){ // does the user exist? Did we receive a user with a property of id?
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        })
    }

    render( ) {
        return (
            <article className="br3 bg-purple ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="white f1 fw6 ph0 mh0">SIGN IN</legend>
                        <div className="mt3">
                            <label className="db fw6 white lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange} 
                            className="shadow-5 pa2 input-reset ba bg-white hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 white lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="shadow-5 b pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange} />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-black white grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn}/>
                        </div>
                        <div className="lh-copy mt3">
                         <p 
                            onClick={() => this.props.onRouteChange('register')}
                            className="pointer f6 link dim white db">Register
                         </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;