
import react from 'react';
import {Link} from 'react-router-dom';

export default function ReturnLink(props){

    return (
        <Link className='return-link' to={props.to}>
            <svg>
                <path 
                    d='M152.6,57.23a8.83,8.83,0,0,1-8.84,8.83H28.36l34.22,34.22A8.3,8.3,0,1,1,50.83,112L2.8,64a9.59,9.59,0,0,1,0-13.54l5-5,43.05-43A8.31,8.31,0,0,1,62.58,14.18L28.36,48.39h115.4A8.84,8.84,0,0,1,152.6,57.23Z'
                />
            </svg>
        </Link>
    )
}