import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import LoadRazorpay from '../../Services/LoadRazorpay';
import Payment from '../../Services/Payment';
//Material UI
import Spinner from 'react-spinner-material';

//CSS File
import '../../Style/Pages/AddressModal.scss'
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

let details = [];

const validation = ()=>{
  let valid = true;
  const nameandAddress = document.querySelectorAll('#nameAndAddress input');
  nameandAddress.forEach(item=>{
    if(item.value === '' && item.classList.contains('required')){
      valid = false;
      const itemId = document.getElementById(item.id);
      itemId.nextSibling.classList.remove('hiding');
    }
  })
  return valid;
}


const clearValidation = (e)=>{
 document.getElementById(e.target.id).nextSibling.classList.add('hiding')
}


export default function AddressModal({ totalPrice, openAddressModal, setOpenAddressModal }) {

  const [widthX, setWidthX] = useState("50%");
  const [mobileVal, setMobileVal] = useState('');
  const [loader, setLoader]= useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false)
  const navigate = useNavigate()
  const custumStyle = {
    content: {
      width: widthX,
      height: "75vh",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  }

  const addressSpinner = {
      position:"absolute"
  }
  const spinner = {
    // width:"100vw",
    // height:"100vh",
    position:"relative",
    // top: "-500%",
    left: "-500%",
    '@media(maxWidth: 590px)': {
      left: "-200%",
    },
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 400) {
        setWidthX('90%')
      }
      else if (window.innerWidth < 770) {
        setWidthX('75%')
      }
      else if (window.innerWidth < 1000) {
        setWidthX('60%')
      }
      else {
        setWidthX('600px')

      }
    })
  })

  useEffect(()=>{
    if(orderSuccess){
      navigate('/thankyou')
    }
  },[orderSuccess])


  const payNow = async (totalPrice) => {
    const validate = validation();
    if(!validate){
      return false
    }
    setLoader(true);
    details = [];
    const nameandAddress = document.querySelectorAll('#nameAndAddress input');
    nameandAddress.forEach((item) => {
      let obj = {}
      obj[item.name] = item.value;
      details.push(obj)
    })
    details.push({ "amount": totalPrice });
    // console.log(details);
    const razorpayResponse = await LoadRazorpay();

    if (!razorpayResponse) {
      alert('Razorpay could not be loaded')
      return
    }
    setOpenAddressModal(false);
    //Start: Passing UserDetails in the Backend
    Payment(details, setOrderSuccess);
    setTimeout(()=>{setLoader(false)}, 3000)
    //End: Passing UserDetails in the Backend
    


  }


  return (
    <>
    <div className='addressSpinner'>
    <Modal isOpen={openAddressModal} onRequestClose={() => setOpenAddressModal(false)} style={custumStyle}>
      <div id="nameAndAddress" className="addressModal">
        <h2>Name and Address Details</h2>
        <div className='name field'>
          <label htmlFor='fname'>Full Name <span style={{ color: '#ce0505' }}>*</span></label>
          <div className="inputField">
            <input id='fullname' className='required xyz' type="text" name='fullname' placeholder='First Name' onFocus={(e)=>{clearValidation(e)}} />
            <span className="errMessage hiding">This Field is required</span>
          </div>
        </div>
        <div className='mobileNumber field'>
          <label htmlFor='number'>Mobile Number<span style={{ color: '#ce0505' }}>*</span></label>
          <div className="inputField">
            <input id='number' className='required' type="number" maxLength='10' value={mobileVal} name='mobileNum' placeholder='Mobile Number' onChange={(e)=>{if(e.target.value.length >= 10){return false} else setMobileVal(e.target.value)}} onFocus={(e)=>{clearValidation(e)}}/>
            <span className="errMessage hiding">This Field is required</span>
          </div>
        </div>
        <div className='email field'>
          <label htmlFor='email'>Email <span style={{ color: '#ce0505' }}>*</span></label>
          <div className="inputField">
            <input id='email' className='required' type="email" name='email' placeholder='Email' onFocus={(e)=>{clearValidation(e)}}/>
            <span className="errMessage hiding">This Field is required</span>
          </div>
        </div>
        <div className='address'>
          <label htmlFor='addressLine1'>Address <span style={{ color: '#ce0505' }}>*</span></label>
          <div className='addressFields'>
 
          <div className="inputField">
            <input id='addressLine1' className='required' type="text" name='address1' placeholder='Address Line 1' onFocus={(e)=>{clearValidation(e)}}/>
            <span className="errMessage hiding">This Field is required</span>
          </div>
          <div className="inputField">
            <input id='addressLine2' type="text" name='address2' placeholder='Address Line 2' />
            <span className="errMessage hiding">This Field is required</span>
          </div>
          <div className="inputField">
            <input id='landmark' type="text" name='landmark' placeholder='Landmark' />
            <span className="errMessage hiding">This Field is required</span>
          </div>
          <div className="inputField">
            <input id='pincode' className='required' type="number" name='pincode' placeholder='Pincode' onFocus={(e)=>{clearValidation(e)}}/>
            <span className="errMessage hiding">This Field is required</span>
          </div>
                     
          </div>
        </div>
        < button type='submit' className='btn' onClick={() => payNow(totalPrice)}>PAY NOW</button>
      </div>
    </Modal>
      <div className='spinner'>
        <Spinner radius={120} color={"#ce0505"} stroke={2} visible={loader} />
      </div>
    </div>  
      </> 
  )
}


