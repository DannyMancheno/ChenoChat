
import '../Styling/Auth.css';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';
import ReturnLink from './Subcomponent/ReturnLink';
import {containerExited, containerHovered} from './SharedFunctions/Background';
import {requestAPI} from './SharedFunctions/Requests';
import ReCaptcha from 'react-google-recaptcha';
import {useRef, useState} from 'react';

export default function Register(){

    let refCaptcha = useRef(null);
    let usernameInvalidRegex = /[^a-zA-Z0-9]+/

    let [registerData, updateRegisterData] = useState({
        username: '',
        password: '',
        confirm: '',
        birthday: '',
        securityQ: '',
        securityA: '',
    })

    function toggleUIError(target, valid, message){
        if(valid){
            // Make default elements
            document.getElementById(target).parentElement.style.borderColor = 'grey'
            document.getElementById(target).parentElement.style.color = 'orange'
            let message = '';
            switch(target){
                case 'register-username' : message = 'Username'; break;
                case 'register-password' : message = 'Password'; break;
                case 'register-confirm' : message='Confirm Password'; break;
                case 'register-birthday' : message = 'Birthday'; break;
                case 'register-securityA' : message = 'Security Answer'; break;
                case 'register-securityQ' : message = 'Security Question'; break;
                default : message = 'ERROR - toggleUIError bug';
            }
            document.getElementById(target).previousElementSibling.innerText = message
        }
        else{
            document.getElementById(target).parentElement.style.borderColor = 'red';
            document.getElementById(target).parentElement.style.color = 'red';
            if(message){
                document.getElementById(target).previousElementSibling.innerText = message
            }
        }
    }

    function updateRegisterDataFunc(event){
        let {name, value, id} = event.target;
        
        // Update registerData with the updated value
        updateRegisterData(old => {return {...old, [name]: value}})
        
        toggleUIError(id, true);

        // Check if username input contains bad data
        if(name === 'username'){
            if(usernameInvalidRegex.test(value)){
                toggleUIError('register-username', false, 'Only letters and numbers valid');
            }
            else{
                toggleUIError('register-username', true);
            }
        }
    }
    function submitRegisterData(event){
        event.preventDefault();
        
        const recaptchaVal = refCaptcha.current.getValue()
        var dataValid = true;
        // Check if a value was left empty
        for(let key in registerData){
            toggleUIError(`register-${key}`, registerData[key] !== '')
            if(registerData[key] === '') dataValid = false;
        }
        // Check if password length is okay
        if(registerData.username.length < 5 || registerData.username.length > 35){
            dataValid = false;
            toggleUIError('register-username', false, 'Must be between 5 to 35 characters')
        }
        if(registerData.password.length < 4 || registerData.password.length > 35){
            dataValid = false;
            toggleUIError('register-password', false, 'Must be between 4 to 35 characters')
        }
        if(registerData.securityA.length < 4 || registerData.securityA.length > 35){
            dataValid = false;
            toggleUIError('register-securityA', false, 'Must be between 4 to 35 characters')
        }


        // Check if password and confirm passwords are matched
        if(registerData.password !== registerData.confirm){
            dataValid = false;
            toggleUIError('register-password', false);
            toggleUIError('register-confirm', false, 'Incorrect Match');
        }

        // Check if grecaptcha has not been selected by the user
        if(!recaptchaVal){
            dataValid = false;
            document.querySelector(`#auth-register-recaptcha iframe`).style.borderColor = 'red'
        }
        else{
            document.querySelector(`#auth-register-recaptcha iframe`).style.borderColor = 'grey'
        }

        // If dataValid has never been turned false, data valid, proceed to web server for further validation. 
        if(dataValid){
            let submitData = {...registerData, recaptcha: recaptchaVal}
            requestAPI('POST', '/authentication/register', submitData);
        }
    }
	
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
            <img src={Logo} className='auth-logo' alt='Site logo'/>
            <div className='auth-title'>ChenoChat</div>
            <div className='auth-description'>
                ChenoChat, a place to connect with friends and family, and share connections today!
            </div>
            <div className='auth-type'>Register</div>
            <form className='register-container'
                onSubmit={submitRegisterData}
            >
                {/* Registration Data */}
                <fieldset>
                    <legend align='left'>Username</legend>
                    <input type='text'
                        name='username'
                        id='register-username'
                        placeholder='Between 5 to 35 characters'
                        maxLength={35}
                        value={registerData.username}
                        onChange={updateRegisterDataFunc}
                    />
                </fieldset>
                <fieldset>
                    <legend align='left'>Password</legend>
                    <input type='password' 
                        name='password'
                        id='register-password'
                        maxLength={35}
                        placeholder='Between 4 to 35 characters'
                        value={registerData.password}
                        onChange={updateRegisterDataFunc}
                    />
                </fieldset>
                <fieldset>
                    <legend align='left'>Confirm Password</legend>
                    <input type='password' 
                        name='confirm'
                        id='register-confirm'
                        maxLength={35}
                        placeholder='Retype Password'
                        value={registerData.confirmPass}
                        onChange={updateRegisterDataFunc}
                    />
                </fieldset>
                <div className='security-question-divider'></div>
                <fieldset>
                    <legend align='left'>Birthday</legend>
                    {/* <input type='date'></input> */}
                    <input type='date' 
                        name='birthday'
                        id='register-birthday'
                        min="1914-07-28"
                        max="2020-01-01"
                        value={registerData.birthday}
                        onChange={updateRegisterDataFunc}
                    />
                </fieldset>
                <div className='security-question-divider'></div>
                {/* Security Question */}
                <fieldset>
                    <legend>Security Question</legend>
                    <select className='auth-select'
                        value={registerData.securityQ}
                        name='securityQ'
                        id='register-securityQ'
                        onChange={updateRegisterDataFunc}
                    >
                        <option value=''>Select a security question</option>
                        <option value='What was your first pets name?'>What was your first pets name?</option>
                        <option value='In which city did your parents meet?'>In which city did your parents meet?</option>
                        <option value='What city were you born in?'>What city were you born in?</option>
                        <option value='What is your grandmothers maidin name?'>What is your grandmothers maidin name?</option>
                        <option value='What is the manufacturer of your first car?'>What is the manufacturer of your first car?</option>
                        <option value='What is your favorite country to visit?'>What is your favorite country to visit?</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend >Security Answer</legend>
                    <input type='text'
                        name='securityA'
                        id='register-securityA'
                        maxLength={35}
                        placeholder='Answer between 4 to 35 characters'
                        onChange={updateRegisterDataFunc}
                    />
                </fieldset>
                {/* Submit */}
                <div className='auth-submit'>
                    <ReCaptcha
                        id='auth-register-recaptcha'
                        sitekey="6Lc0b3MpAAAAAJsYiKn7HxyTlurydYOORTMJjn8V" 
                        theme='dark'
                        ref={refCaptcha}
                    />
                    <button className='auth-register-button'>Register</button>
                </div>
            </form>
        </div>
    )
}