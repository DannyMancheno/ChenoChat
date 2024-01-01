import react, {useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../IMGs/Logos/MainLogo.svg';

import '../Styling/Splash.css';

export default function Splashscreen(){
    let [useIntro, updateUsedIntro] = useState(false);

    return (
        <div className='splashscreen-container'>
            <img src={Logo}></img>
            <h1>
                ChenoChat
            </h1>
            <p>
                Enter ChenoChat, connect with family and friends.
            </p>
            <Link to='/Login' className='splash-enter'>Enter</Link>
        </div>
    )
}