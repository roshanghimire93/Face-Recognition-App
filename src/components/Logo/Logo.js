import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import facerecognition from './facerecognition.png'

const Logo = ({isSignedIn, onRouteChange}) => {
    return(
        <div className='logo ma4 mt0'>
            <Tilt className="Tilt br2 shadow-3" options={{ max : 40 }} style={{ height: 125, width: 125 }} >
                <div className="Tilt-inner pa2">
                    <img onClick={() => {if (isSignedIn){
                        return onRouteChange('home')
                    }
                    else{
                        return onRouteChange('signin')
                    }
                    }} alt='face-recognition' src={facerecognition}/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;