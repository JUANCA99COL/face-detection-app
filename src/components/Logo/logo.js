import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './logo.css';

const Logo = () => {
    return  (
        <div className="ma4 mt0">
             <Tilt className="Tilt br2 shadow-2" style={{margin: 'auto', display: 'block', width:'400px', height: '150px' }}>
                <div className="pa3">
                    <img className="pointer" src={brain} alt='logo' style={{paddingTop: '5px'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo