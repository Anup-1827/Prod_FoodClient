import React, { Component, useState } from 'react';
import axios from 'axios';
import logo from '../Assets/logo.png'


import Swal from 'sweetalert2'

export default function Payment(details) {
  // const [showMess, setShow] =useState(true)
    // let data 
    axios.post('https://foodbackend.onrender.com/v1/payment',details)
    .then(res=>
      {
        // res.data();
        // console.log(res.data);

        const address = `${details.filter(item => (Object.keys(item).toString().toLowerCase() === 'address1'))[0].address1} ${details.filter(item => (Object.keys(item).toString().toLowerCase() === 'address2'))[0].address2} ${details.filter(item => (Object.keys(item).toString().toLowerCase() === 'landmark'))[0].landmark}`
  
        var options = {
          "key": "rzp_test_pvV1PmItteOH6K", // Enter the Key ID generated from the Dashboard
          "amount": (details.filter(item => (Object.keys(item).toString().toLowerCase() === 'amount'))[0].amount *100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": res.data.currency,
          "name": "FOOD APP",
          "description": "Test Transaction",
          "image": logo,
          "order_id": res.data.id,
          "handler": function (response){
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature)
              // console.log(response);
              Swal.fire({
                title: "Payment is Successful",
                icon: "success",
                button: "OK",
              })
              .then(()=>{
                Swal.fire({
                  title: "Your Order is Placed",
                  icon: "success",
                  button: "OK",
                }).then(()=>{
                  window.location = `${window.location.origin}/thankyou`
                })
              })
              
          },
          "prefill": {
              "name": details.filter(item => (Object.keys(item).toString().toLowerCase() === 'fullname'))[0].fname,
              "email": details.filter(item => (Object.keys(item).toString().toLowerCase() === 'email'))[0].email,
              "contact": details.filter(item => (Object.keys(item).toString().toLowerCase() === 'mobilenum'))[0].mobileNum.toString()
          },
          "notes": {
              "address": address
          },
          "theme": {
              "color": "#ce0505"
          }
      
        };
    
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

      })
     .catch(err=> 
      {
        console.log(err);
        alert(err)
    })
}
