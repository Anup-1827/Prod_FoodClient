import React from 'react'
import '../../../Style/Pages/Orders/Orders.scss'
import Modal from 'react-modal';

// Components
import OnlineOrder from '../../Modal/OnlineOrder';


Modal.setAppElement('#root');


export default function Orders({ restaurantDetails }) {

  return (
    <>
      <OnlineOrder restaurantDetails={restaurantDetails}/>
    </>
  )
}



