
import React, {useState, useEffect, useRef} from 'react';
import {Route, Routes} from 'react-router-dom';
import '../Styling/App.css';

import Splash from './Splash';
import Login from './Login';
import NotFound from './NotFound';

export default function App() {
    
    let IDElement = x => {document.getElementById(x)}

    let [appVersion, updateAppVersion] = useState([{}]);

    useEffect(()=>{
        fetch('/appVersion')
            .then(res => res.json())
            .then(data =>{
                updateAppVersion(data.appVersion)
            });
    },[])

    let [useIntro, updateUseIntro] = useState((sessionStorage.getItem(`ChenoChatIntro`) === null));

    useEffect(()=>{
        if(useIntro){
            sessionStorage.setItem('ChenoChatIntro', false)
        }
    }, [])

    return (
        <div className='app-container'>
            <svg className='app-background'
                viewBox='0 0 100 100'
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: "100%",
                    height:"100%",
                    zIndex: 0
                }}
            >
                <path d='M434-22.68l11,837.36H-269s415-163,445-448S44-22.68,44-22.68Z' 
                    id='splash-background-path1'
                    style={{
                        fill: 'rgba(96, 63, 175, 0.3)',
                        animation: (useIntro) ? 'animatePath1 2s forwards ease-out' : 'none',
                        transform: (useIntro) ? 'translate(-200% , -300%)' : 'translate(-120%, -300%)'
                    }}
                />
                
                <path d="M244.33-97.52s444,322.52,0,947.85H479s96-715.17-26.67-956.25Z" 
                    id='splash-background-path2'
                    style={{
                        fill: 'rgb(77, 51, 138, 0.3)',    
                        animation: (useIntro) ? 'animatePath2 2s forwards  ease-out' : '',
                        transform: (useIntro) ? 'translate(-360%, -400%)' : 'translate(-400%, -400%)'
                    }}
                />
            </svg> 
            <div className='app-routing-elements'> 
                <Routes>
                    <Route path='/' element={<Splash useIntro={useIntro}/>} />
                    <Route path='/Login' element={<Login />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </div>
            <div className='app-info-container'>
                <div className='app-copyright'>
                    &copy; ChenoChat
                </div>
                <div className='app-contact'>
                    contact@dannymancheno.me
                </div>
                <div className='app-version'>
                    App version {
                        (typeof appVersion === undefined) ? 
                        ( 'Fetching' ) :
                        ( `${appVersion}`)
                    }
                </div>
            </div>
        </div>
    )
}
