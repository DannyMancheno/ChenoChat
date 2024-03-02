
import '../Styling/Auth.css';
import Logo from '../IMGs/Logos/ChenoChatIcon.svg';
import ReturnLink from './Subcomponent/ReturnLink';
import {containerExited, containerHovered} from './SharedFunctions/Background';
import {requestAPI} from './SharedFunctions/Requests';
import ReCaptcha from 'react-google-recaptcha';
import {useEffect, useRef, useState} from 'react';
// import { queryDB } from '../../../SharedFunctions/database';

export default function Register(){

    let refCaptcha = useRef(null);
    
    let usernameInvalidRegex = /[^a-zA-Z0-9]+/;

    let [registerData, updateRegisterData] = useState({
        username: '',
        password: '',
        confirm: '',
        birthday: '',
        securityQ: '',
        securityA: ''
    })

    function registrationResponseHandler(message, success){
        if(success !== null){
            if(success === true){
                updateRegisterResult({message: message, success: true})
                updateRegisterData({username: '',password: '',confirm: '',birthday: '',securityQ: '',securityA: ''})
            }
            else{
                updateRegisterResult({message: message, success: false})
            }
        }
        else updateRegisterResult({message: '', success: null});
    }

    // Default value
    let [registerResult, updateRegisterResult] = useState({message: '', success: null});
    // Success test value
    // let [registerResult, updateRegisterResult] = useState({message: 'TEST - You have successfully registered', success: true});
    // Failure test value
    // let [registerResult, updateRegisterResult] = useState({message: 'TEST - You failed to register an account', success: false});

    useEffect(()=>{
        if(registerResult.success !== null){
            document.getElementsByClassName('auth-result-image')[0].style.animation = 'revealContainer 0.5s forwards';
            document.getElementsByClassName('auth-result-message')[0].style.opacity = '0';
            document.getElementsByClassName('auth-result-message')[0].style.animation = 'revealContainer 0.5s forwards 1s';
        }
    }, [registerResult.success])

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
        
        // console.log(event);
        if(typeof(event) === 'object'){
            // Default input behavior
            let {name, value, id} = event.target;
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
        else if(event === 'checkUsername'){
            requestAPI('POST', '/authentication/checkUsername', {username: registerData.username}, 201).then(res =>{
                // registrationResponseHandler(res, true); // params = server message, display?, success?
                toggleUIError('register-username', false, res)
            })

            
        }
    }

    function submitRegisterData(event){
        event.preventDefault();
        
        let recaptchaVal = refCaptcha.current.getValue();
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
            let submitData = {...registerData, recaptcha: recaptchaVal};
            requestAPI('POST', '/authentication/register', submitData, 201).then(res =>{
                registrationResponseHandler(res, true); // params = server message, display?, success?
            }).catch(err =>{
                registrationResponseHandler(err, false); 
            });
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
            {/* <ReturnLink to={'/Register'}/> */}

            <img src={Logo} className='auth-logo' alt='Site logo'/>
            <div className='auth-title'>ChenoChat</div>
            <div className='auth-description'>
                ChenoChat, a place to connect with friends and family, and share connections today!
            </div>
            <div className='auth-type'>Register</div>

            {
                registerResult.success === null && 
                <form className='register-container'
                    onSubmit={submitRegisterData}
                    id='register-form-container'
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
                            onBlur={()=>{
                                updateRegisterDataFunc('checkUsername');
                            }}
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
                            value={registerData.confirm}
                            onChange={updateRegisterDataFunc}
                        />
                    </fieldset>
                    <div className='security-question-divider'></div>
                    <fieldset>
                        <legend align='left'>Birthday</legend>
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
                            value={registerData.securityA}
                            id='register-securityA'
                            maxLength={35}
                            placeholder='Answer between 4 to 35 characters'
                            onChange={updateRegisterDataFunc}
                        />
                    </fieldset>
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
            }
            {
                registerResult.success === true && 
                <div className='auth-result' id='auth-result-register-success'>
                    <div className='auth-result-image'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.84 127.06"><path d="M649.74-6552.42h0a12,12,0,0,1,2.57,16.8l-74.58,101.5a15.75,15.75,0,0,1-22,3.37l-39-28.66a12,12,0,0,1-2.57-16.8h0a12,12,0,0,1,16.8-2.56L563.27-6455l69.67-94.83A12,12,0,0,1,649.74-6552.42Z" transform="translate(-511.81 6554.75)"/></svg>
                    </div>
                    <div className='auth-result-message'>{registerResult.message}</div>
                </div>
            }
            {
                registerResult.success === false && 
                <div className='auth-result' id='auth-result-register-failure'>
                    <div className='auth-result-image'>
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.49 152.49"><path d="M650.36-5106.22l-51.84,51.84,51.67,51.67a14.24,14.24,0,0,1,0,20.15h0a14.26,14.26,0,0,1-20.15,0l-51.67-51.67-51.83,51.83a14.24,14.24,0,0,1-20.15,0h0a14.24,14.24,0,0,1,0-20.15l51.83-51.83-52-52a14.24,14.24,0,0,1,0-20.15h0a14.26,14.26,0,0,1,20.15,0l52,52,51.84-51.84a14.26,14.26,0,0,1,20.15,0h0A14.26,14.26,0,0,1,650.36-5106.22Z" transform="translate(-502.05 5130.71)"/></svg>
                    </div>
                    <div className='auth-result-message'>{registerResult.message}</div>
                </div>
            }
        </div>
    )
}