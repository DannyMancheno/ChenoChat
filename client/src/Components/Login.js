
import '../Styling/Login.css';

export default function Login(){    
    return (
        <div className='login-container'>
            <h1>ChenoChat</h1>
            <p>
                Login to 
            </p>
            <form className='login-form'>
                Username
                <input></input>
                Password
                <input></input>
            </form>
        </div>
    )
}