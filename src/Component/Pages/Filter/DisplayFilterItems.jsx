import React from 'react'
import { Link,useParams } from 'react-router-dom'
import BreakfastImg from '../../../Assets/Images/Breakfast.png'
import LunchImg from '../../../Assets/Images/Lunch.png'
import SnacksImg from '../../../Assets/Images/Snacks.png'
import DinnerImg from '../../../Assets/Images/Dinner.png'
import DrinksImg from '../../../Assets/Images/Drinks.png'
import NightLifeImage from '../../../Assets/Images/Nightlife.png'

export default function DisplayFilterItems({item, index}) {
    const {mealType} = useParams(); 
    let image = BreakfastImg;
    if(mealType.toLowerCase() === 'breakfast'){
        image = BreakfastImg;
    }
    else if(mealType.toLowerCase() === 'lunch'){
        image = LunchImg;
    }
    else if(mealType.toLowerCase() === 'snacks'){
        image = SnacksImg;
    }
    else if(mealType.toLowerCase() === 'dinner'){
        image = DinnerImg;
    }
    else if(mealType.toLowerCase() === 'drinks'){
        image = DrinksImg;
    }
    else if(mealType.toLowerCase() === 'drinks'){
        image = NightLifeImage;
    }


  return (
    <div key={index} className='Menu'>
                    <Link to={`/${mealType}/Restaurant/${item["idRes"]}`}>
                        <div className='menuHeader'>
                            <div className='menuImg'>
                                <img src={image} />
                            </div>
                            <div className='resturantName'>
                                <h2>{item["restaurant"]}</h2>
                                <h4>Fort</h4>
                                <p>{item.address}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='menuInfo'>
                            <div className='Cuisine'>
                                <p>Location</p>
                                <p>CUISINES</p>
                                <p>COST FOR TWO</p>
                            </div>
                            <div className='menuNameAndProce'>
                                <p>{item["location"]}</p>
                                <p>{item["cuisine"]}</p>
                                <p>{`₹${item["costforTwo"]} `}<span>approx.</span></p>
                            </div>
                        </div>
                    </Link>
                </div>
  )
}
