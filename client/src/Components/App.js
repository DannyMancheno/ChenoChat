import '../Styling/App.css';
import React, {useState, useEffect, useRef} from 'react';
import {Route, Routes} from 'react-router-dom';
import Splash from './Splash';
import Login from './Login';

export default function App() {

    let [appVersion, updateAppVersion] = useState([{}]);

    useEffect(()=>{
        fetch('/appVersion')
            .then(res => res.json())
            .then(data =>{
                updateAppVersion(data.appVersion)
            });
    })

    return (
        <>
            <div className='appContainer'>
                <Routes>
                    <Route path='/' element={<Splash />} />
                    <Route path='/login' element={<Login />}/>
                </Routes>
            </div>
            <div className='app-info'>
                <div className='app-copyright'>
                    &copy; Danny Mancheno
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
        </>
    )
}
