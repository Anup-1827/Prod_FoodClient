import React from 'react';
import '../../Style/HeaderAndFooter/Header.scss'
//Packages
import { Link } from 'react-router-dom'
import Login from '../Modal/Login';
import Register from '../Modal/Register';


export default function Header() {
    // const [login, SetLogin] = useState(false)
    return (
        <div className='Header'>
           <Link to='/'><h1>e!</h1></Link>
            <div className='loginAndAccount'>
                
                {/* <Login/>
                <Register/> */}
            </div>
        </div>
    );
}
