
import React, {useState, useEffect, useRef} from 'react';
import {Route, Routes} from 'react-router-dom';
import '../Styling/App.css';

import Splash from './Splash';
import Login from './Login';
import NotFound from './NotFound';

export default function App() {
    
    let [appVersion, updateAppVersion] = useState([{}]);

    useEffect(()=>{
        fetch('/appVersion')
            .then(res => res.json())
            .then(data =>{
                updateAppVersion(data.appVersion)
            });
    },[])


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
                }}
            >
                <path d='M434-22.68l11,837.36H-269s415-163,445-448S44-22.68,44-22.68Z' 
                    id='splash-background-path1'
                    transform='translate(-80, -80), scale(.6)'
                />
                
                <path d="M244.33-97.52s444,322.52,0,947.85H479s96-715.17-26.67-956.25Z" 
                    id='splash-background-path2'
                    transform='translate(-180, -70), scale(.6)'
                />
            </svg> 
            <div className='app-routing-elements'> 
                <Routes>
                    <Route path='/' element={<Splash />} />
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
