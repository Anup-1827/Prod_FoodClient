import '../../Style/LoginAndRegistration/Login.scss'
// Package
import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')
export default function Login() {
    const [modal, SetModal] = useState(false);

    const custumStyle = {
            content :{
                width:'30%',    
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            }
    }

return <>
        <a to="#" className='login com' onClick={()=>{SetModal(true)}}>Login</a>
        <Modal isOpen={modal} onRequestClose={()=>{SetModal(false)}} style={custumStyle}>
                <form className='loginForm'>
                        <h2>Login</h2>
                        <div><label htmlFor='login'>Email</label></div>
                        <input id='login' type="email" placeholder='Email' required/> 
                        <div><label htmlFor='password'>Password</label></div>
                        <input id='password' type="password" placeholder='Password' required/> 
                        <button className='btn'>Login</button>
                </form>
        </Modal>
        </>

}
