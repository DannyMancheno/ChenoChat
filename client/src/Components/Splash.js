import react, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';

import '../Styling/Splash.css';


export default function SplashBackground(){

    // let IDElement = x =>{ return document.getElementById(x)};

    // let [useIntro, updateUsedIntro] = useState(true);

    // useEffect(()=>{

    //     console.log(useIntro);

    //     if(useIntro){
    //         // IDElement('id-splash-logo').style.animation = 'animateSplash 1s forwards'
    //     }
    //     else{
            
    //     }
    // }, [useIntro])

    return (
        <div className='splashscreen-container'>
            <img src={Logo} className='splash-logo' id='id-splash-logo'></img>
            <div className='splash-text'>
                <h1 className='splash-title'> ChenoChat </h1>
                <p className='splash-description'> Join and connect with friends and family. </p>
            </div>
            <Link to='/Login' className='splash-enter'>Enter</Link>
        </div>
    )
}