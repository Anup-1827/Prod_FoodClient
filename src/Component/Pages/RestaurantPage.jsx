import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Images
import BreakfastRestaurant from '../../Assets/Images/BreakfastRestaurant.png'
import LunchRestaurant from '../../Assets/Images/LunchRestaurant.png'
import SnacksRestaurant from '../../Assets/Images/SnacksRestaurant.png'
import DinnerRestaurant from '../../Assets/Images/DinnerRestaurant.png'
import NightlifeRestaurant from '../../Assets/Images/NightlifeRestaurant.png'
import DrinksRestaurant from '../../Assets/Images/DrinksRestaurant.png'



import '../../Style/Pages/RestaurantPage.scss'
// Restaurant List
import restaurantList from '../../restauranList.json'
import Orders from './Orders/Orders';


export default function RestaurantPage(props) {
  const [info, setInfo] = useState(true);
  const {id} =useParams();
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [location, setLocation]= useState('Mumbai, Maharashtra 400030');
  const [restaurantImage, setRestaurantImage] = useState(BreakfastRestaurant)


  useEffect(()=>{
    const ResListFun = async ()=>{
      try{
          const ResList = await axios.get('https://foodbackend.onrender.com/v1/restaurantList').then(
              (result)=>{
                const item = result.data.list
                const restaurantDetails = item.filter(item=> item.idRes == id);
                const mealType = restaurantDetails[0]['mealType']
                setRestaurantDetails(restaurantDetails);
                
                if(restaurantDetails[0]['location'].toLowerCase() === "mumbai"){
                  setLocation('Mumbai, Maharashtra 400030')
                }
                else if(restaurantDetails[0]['location'].toLowerCase() === "delhi"){
                  setLocation('Delhi, Delhi 110001');
                }
                else if(restaurantDetails[0]['location'].toLowerCase() === "bangalore"){
                  setLocation('Bangalore, Karnataka 560014');
                }


              if(mealType.toLowerCase() === 'lunch'){
                setRestaurantImage(LunchRestaurant)
              }
              else if(mealType.toLowerCase() === 'snacks'){
                setRestaurantImage(SnacksRestaurant)
              }
              else if(mealType.toLowerCase() === 'dinner'){
                setRestaurantImage(DinnerRestaurant)
              }
              else if(mealType.toLowerCase() === 'drinks'){
                setRestaurantImage(DrinksRestaurant)
              }
              else if(mealType.toLowerCase() === 'nightlife'){
                setRestaurantImage(NightlifeRestaurant)
              }
              
              })
      }
      catch(err){
          alert(err)
      }
  }
  ResListFun()
  },[])


  

  return (restaurantDetails.length != 0? <div className='RestaurantPage'>
    <div className='image'>
      <img src={restaurantImage}/>
    </div>
    <h2>{restaurantDetails[0]['restaurant']}</h2>
    <div className='PalceOrder'>
      {<Orders restaurantDetails={restaurantDetails}/>}
    </div>

    {/* Start of Restaurants Details */}
    <div className='RestaurantDetails'>
      <div className='Heading'>
        <p className={(info?'border': '')} onClick={()=>{setInfo(true)}}>Overview</p>
        <p className={(!info?'border': '')} onClick={()=>{setInfo(false)}}>Contact</p>
      </div>
      <hr/>
      <div className={'Overview' + (info?'': ' hide')}>
        <h4>About this Place</h4>
        <p className='Cuisine'>Cuisine</p>
        <p>{restaurantDetails[0]['cuisine']}</p>
        <p className='AvgCost'>Average Cost</p>
        <p>₹{restaurantDetails[0]['costforTwo']} for Two(approx.)</p>
      </div>
      <div className={'Contact' + (info?' hide':'')}>
        <h4>Phone Number</h4>
        <p className='phoneNumber'>{restaurantDetails[0]['phoneNumber']}</p>
        <h4>{restaurantDetails[0]['restaurant']}</h4>
        <p className='address'>{restaurantDetails[0]['address']} <br/>{location}</p>
      </div>
    </div>
    {/* End of Restaurants Details */}
  </div>: "")
}
