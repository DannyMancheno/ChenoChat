import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styling/index.css';
import App from './Components/App';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

let nameTaken = ['Username is already in use', 'Username taken', 'Darn, username is already in use :C'];
let nameSafe = ['Awesome, you created an account!', 'Congrats, you successfully registed', 'You did it! You registered!'];
for(let i = 0; i < 10; i++){
    console.log(nameTaken[Math.floor(Math.random() * nameTaken.length)])
}
console.log('WIP - good bad Responses');
