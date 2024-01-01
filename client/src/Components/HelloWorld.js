import '../Styles/Helloworld.css';
import Header from './Header';

export default function HelloWorld(){
    return (
        <div className="HelloWorld">
            <Header />
            <h1>Hello World</h1>
            <p>
                This is the first client/server react app i've ever built :D!
            </p>
        </div>
    )
}