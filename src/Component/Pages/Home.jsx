// Css File
import '../../Style/Pages/Home.scss'
import Breakfast from '../../Assets/Images/Breakfast.png'
import Lunch from '../../Assets/Images/Lunch.png'
import Snacks from '../../Assets/Images/Snacks.png'
import Dinner from '../../Assets/Images/Dinner.png'
import Drinks from '../../Assets/Images/Drinks.png'
import NightLife from '../../Assets/Images/Nightlife.png'


// Packges
import React from 'react'
// Components
import MealType from './MealType'
import Login from '../Modal/Login'
import Register from '../Modal/Register'

export default function Home() {
    return (
        <div className='Home'>
            <div className='header'>
                <div className='loginAndAccount'>
                    {/* <Login/>
                    <Register/> */}
                </div>
                <div className='logoAndSearch'>
                    <div className='logo d-flex'>e!</div>
                    <div className='about'>Find the best resturants, cafés and bars</div>
                    {/* <div className='searchBox'>
                        <select className='searchCity'>
                            <option>Select</option>
                            <option>Mumbai</option>
                            <option>Delhi</option>
                            <option>Banglore</option>
                        </select>
                        <input type='text' className='searchHotels' placeholder='Search Restaurant'></input>
                    </div> */}
                </div>
            </div>

            <div className='info'>
                <div className='quickSearchInfo'>
                    <h2 className='quickSearch'>Quick Search</h2>
                    <p className='discover'>Discover restaurants by type of meal</p>
                </div>
                <div className = "mealtype">
                    <MealType image={Breakfast}  heading={`Breakfast`} info={`Start your day with exclusive breakfast options`}/>
                    <MealType image={Lunch}  heading={`Lunch`} info={`Start your day with exclusive lunch options`}/>
                    <MealType image={Snacks}  heading={`Snacks`} info={`Start your day with exclusive snacks options`}/>
                    <MealType image={Dinner}  heading={`Dinner`} info={`Start your day with exclusive dinner options`}/>
                    <MealType image={Drinks}  heading={`Drinks`} info={`Start your day with exclusive drinks options`}/>
                    <MealType image={NightLife}  heading={`NightLife`} info={`Start your day with exclusive nightlife options`}/>
                </div>
            </div>
        </div>
    )
}
