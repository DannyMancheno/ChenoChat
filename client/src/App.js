
import react, {useEffect, useState} from 'react';
import './Styles/App.css';
import HelloWorld from './Components/HelloWorld';


export default function App() {
    let [flower, updateFlower] = useState([{}]);
    useEffect(()=>{
        fetch('/flower').then( response => response.json()).then(data =>{
            updateFlower(data)
        });
    }, [])
    return (
        <div className='appContainer'>
            <HelloWorld />
            {(typeof flower === undefined) ? (
                <p>Loading</p>
            ) : (
                <p key={flower} className='dataP'>Data Retrieved from API : {flower.name}</p>
            )}
        </div>
    )
}
