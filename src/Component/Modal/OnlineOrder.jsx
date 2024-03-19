import React, { useState, useEffect, useReducer } from 'react'
import Modal from 'react-modal'
import reducer from '../Pages/Orders/Reducer'
import itemList from '../Pages/Orders/ItemList.json';
import AddressModal from './AddressModal';

Modal.setAppElement('#root');
  
const initalState = itemList;

export default function OnlineOrder({restaurantDetails}) {
    const { restaurant} = restaurantDetails[0];
    const [openModal, setModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false); 
    const [state, dispatch] = useReducer(reducer, initalState);
    const [widthX, setWidthX] = useState("50%");
    const totalPrice = state.reduce((total, item) => total += item.price * item.count, 0)


    const custumStyle = {
        content: {
          width: widthX,
          height: "80vh",
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }
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
    

    const checkTotal = () => {
        const errorMsg = document.getElementById('errorMsg');
        if (totalPrice === 0) {
          errorMsg.classList.remove('hide')
        } else {
          errorMsg.classList.add('hide')
          setModal(false);
          setOpenAddressModal(true);
        }
      }


  return (
      <>
        <button className='OrderBtn' onClick={() => setModal(true)}>Place Online Order</button>
      <Modal isOpen={openModal} onRequestClose={() => setModal(false)} style={custumStyle}>
        <div className="orderModal">
          <h2 className='heading'>{restaurant}</h2>
          <div className="items">
            {
              state.map((item, index) => {
                return (
                  <div key={index} className="item">
                    <div className="itemInfo">
                      <div className='greenDot'><div className='dot'></div></div>
                      <h4>{item.itemName}</h4>
                      <h4>₹{item.price}</h4>
                      <p>{item.itemInfo}</p>
                    </div>
                    <div className="quantity">
                      <div className="image"></div>
                      <div className='btn'>
                        <button className='minus' onClick={(e) => { e.preventDefault(); dispatch({ type: "decrement", payload: item.id }) }}>-</button>{item.count}<button className='green' onClick={() => { dispatch({ type: "increment", payload: item.id }) }}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="totalBar">
            <div className="total">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
              <h6 id='errorMsg' className='errMsg hide'>Please Select Item</h6>
            </div>
            <div className="PayNow">
              <button className='btnPayNow' onClick={() => checkTotal()}>Next</button>
            </div>
          </div>
        </div>
      </Modal>
      
      <AddressModal totalPrice={totalPrice} openAddressModal={openAddressModal} setOpenAddressModal={setOpenAddressModal}/>
      </>
  )
}
