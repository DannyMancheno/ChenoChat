

import '../Styling/Auth.css';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';
import {containerExited, containerHovered } from './SharedFunctions/Background';

import {Link} from 'react-router-dom';
import '../Styling/Auth.css';


export default function Login(){    
    return (
        <div className='auth-form' 
            id='login-auth-form' 
            onMouseMove={(event)=>{
                containerHovered(event, `login-auth-form`, `rgba(55, 55, 55, 0.75)`, `rgba(45, 45, 45, 0.75)`);
            }} 
            onMouseLeave={(event)=>{
                containerExited(event, 3, 'rgba(55, 55, 55, 0.75)', 'rgba(45, 45, 45, 0.75)')
            }}
        >
            <img src={Logo} className='auth-logo'/>
            <div className='auth-title'>ChenoChat</div>
            <div className='auth-description'>
                Welcome to ChenoChat, login and reconnect with your friends, family and others!
            </div>
            <fieldset>
                    <legend align='left'>Username</legend>
                    <input></input>
            </fieldset>
            <fieldset>
                <legend align='left'>Password</legend>
                <input></input>
            </fieldset>
            
            <div className='auth-submit'>
                <div className='login-other-links'>
                    <Link to={'/ForgotPass'}>Forgot Pass</Link>
                    <Link to={'/Register'}>Register</Link>
                </div>
                <button className='auth-login-button'>Login</button>
            </div>
        </div>
    )
}