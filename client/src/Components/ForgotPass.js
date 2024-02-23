
import '../Styling/ForgotPass.css';
import {containerExited, containerHovered } from './SharedFunctions/Background';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';
import ReturnLink from './Subcomponent/ReturnLink';

export default function ForgotPass(){
    return (
        <div className='auth-form' 
            id='forgot-pass-auth-form' 
            onMouseMove={(event)=>{
                containerHovered(event, `forgot-pass-auth-form`, `rgba(55, 55, 55, 0.75)`, `rgba(45, 45, 45, 0.75)`);
            }} 
            onMouseLeave={(event)=>{
                containerExited(event, 3, 'rgba(55, 55, 55, 0.75)', 'rgba(45, 45, 45, 0.75)')
            }}
        >
            <ReturnLink to={'/Login'}/>
            <img src={Logo} className='auth-logo'/>
            <div className='auth-title'>ChenoChat</div>
            <div className='auth-description'>
                If you forgot your password, use the form below to get it back.
            </div>
            <div className='auth-type'>Forgot Password</div>
            <form className='forgot-pass-container'>
                <fieldset>
                    <legend align='left'>Username</legend>
                    <input></input>
                </fieldset>
                <fieldset>
                    <legend align='left'>Birthday</legend>
                    <input type='date'></input>
                </fieldset>
                <div className='security-question-divider'> </div>
                
            </form>
        </div>
    )
}