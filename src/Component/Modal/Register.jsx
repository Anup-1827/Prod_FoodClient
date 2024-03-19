//Packages
import React, { useState } from 'react';
import Modal from 'react-modal'
import '../../Style/LoginAndRegistration/Register.scss'

Modal.setAppElement('#root')
export default function Register() {
    const [registerModal, SetregisterModal] = useState(false);

    const custumStyle = {
      content:{
        width:'50%',
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)',
      }
    }
  return <>
    <button className='createAcc com' onClick={()=>{SetregisterModal(true)}}>Create an account</button>
    
    <Modal isOpen={registerModal} onRequestClose={()=>{SetregisterModal(false)}} style={custumStyle}>
        <form className='Register'>
            <h2>Register</h2>
            <div className='name'>
              <label htmlFor='fname'>Name</label>
              <input id='fname' type="text" name='fname' placeholder='First Name' required/>
              <input id='lname' type="text" name='lname' placeholder='Last Name' required/>
            </div>
            <div className='mobileNumber'>
              <label htmlFor='number'>Mobile Number</label>
              <input id='number' type="number" maxLength={10} minLength={10}  name='fname' placeholder='Mobile Number' required/>
            </div>
            <div className='email'>
              <label htmlFor='email'>Email</label>
              <input id='email' type="email" name='email' placeholder='Email' required/>
            </div>
            <div className='password'>
              <label htmlFor='password'>Password</label>
              <input id='password' type="password" name='password' placeholder='Password' required/>
            </div>
            <div className='confirmPassword'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input id='confirmPassword' type="password" name='confirmPassword' placeholder='Confirm Password' required/>
            </div>
            <button className='btn'>Register</button>
            <h5>Already have an account?<a href='#'>Login</a></h5>
        </form>
    </Modal>
    </>
}
