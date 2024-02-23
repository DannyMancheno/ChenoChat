import react, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';

import '../Styling/Splash.css';


export default function SplashBackground(props){

    let IDElement = x =>{ return document.getElementById(x)};

    useEffect(()=>{
        let logoTime = 1.5;
        if(props.useIntro){
            IDElement('id-splash-logo').style.animation = `splash-logo-intro ${logoTime}s forwards ease-out`
            IDElement('id-splash-title').style.animation = `splash-reveal 1s ${logoTime}s forwards`
            IDElement('id-splash-description').style.animation = `splash-reveal 1s ${logoTime * 1.15}s forwards`
            IDElement('id-splash-enter').style.animation = `splash-reveal 1s ${logoTime * 1.3}s forwards`
            IDElement('id-splash-app-info').style.animation = `splash-reveal 1s ${logoTime * 1.4}s forwards`
        }
    }, [props.useIntro])

    return (
        <div className='splash-container'>
            <img src={Logo} 
                className='splash-logo'
                id='id-splash-logo'
                style={{opacity: (props.useIntro) ? 0 : 1}}
            />
            <div className='splash-text'>
                <h1 
                    className='splash-title'
                    id='id-splash-title'
                    style={{opacity: (props.useIntro) ? 0 : 1}}
                > 
                    ChenoChat
                </h1>
                <p 
                    className='splash-description'
                    id='id-splash-description'
                    style={{
                        opacity: (props.useIntro) ? 0 : 1}
                    }
                >
                    Join and connect with friends and family. 
                </p>
            </div>
            <Link to='/Login'
                className='splash-enter' 
                id='id-splash-enter'
                style={{
                    opacity: (props.useIntro) ? 0 : 1}}
            >
                Enter
            </Link>
            <div className='app-info-container'
                id='id-splash-app-info'
                style={{
                    opacity: (props.useIntro) ? 0 : 1}
                }
            >
                <div className='app-copyright'>
                    &copy; ChenoChat
                </div>
                <div className='app-contact'>
                    contact@dannymancheno.me
                </div>
                <div className='app-version'>
                    App version {
                        (typeof props.appVersion === undefined) ? 
                        ( 'Fetching' ) :
                        ( `${props.appVersion}`)
                    }
                </div>
            </div>
        </div>
    )
}