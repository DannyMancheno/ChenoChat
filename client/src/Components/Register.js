
import '../Styling/Auth.css';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';
import ReturnLink from './Subcomponent/ReturnLink';
import {containerExited, containerHovered } from './SharedFunctions/Background';

export default function Register(){

    return (
        <div className='auth-form' 
            id='register-auth-form' 
            onMouseMove={(event)=>{
                containerHovered(event, `register-auth-form`, `rgba(55, 55, 55, 0.75)`, `rgba(45, 45, 45, 0.75)`);
            }} 
            onMouseLeave={(event)=>{
                containerExited(event, 3, 'rgba(55, 55, 55, 0.75)', 'rgba(45, 45, 45, 0.75)')
            }}
        >
            <ReturnLink to={'/Login'} />
            
            <img src={Logo} className='auth-logo'/>
            <div className='auth-title'>ChenoChat</div>
            <div className='auth-description'>
                ChenoChat, a place to connect with friends and family, and share connections today!
            </div>
            <div className='auth-type'>Register</div>
            <form className='register-container'>
                {/* Registration Data */}
                <fieldset>
                    <legend align='left'>Username</legend>
                    <input></input>
                </fieldset>
                <fieldset>
                    <legend align='left'>Password</legend>
                    <input></input>
                </fieldset>
                <fieldset>
                    <legend align='left'>Confirm Password</legend>
                    <input></input>
                </fieldset>
                <div className='security-question-divider'></div>
                {/* Security Question */}
                <fieldset>
                    <legend>Security Question</legend>
                    <select className='auth-select'>
                        <option>Select a question</option>
                        <option>What was your first pet's name?</option>
                        <option>In which city did your parents meet?</option>
                        <option>What city were you born in?</option>
                        <option>What is your grandmother's maidin name?</option>
                        <option>What is the manufacturer of your first car?</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend >Security Answer</legend>
                    <input></input>
                </fieldset>
                
                {/* Submit */}
                <div className='auth-submit'>
                    <button className='auth-register-button'>Register</button>
                </div>
            </form>
        </div>
    )
}