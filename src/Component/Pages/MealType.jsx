// CSS File 
import '../../Style/Pages/MealType.scss'
// Packages
import React from 'react'
import { Link } from 'react-router-dom'
// import Tippy from '@tippyjs/react'; //ToolTip
// import 'tippy.js/dist/tippy.css'; //Tooltip CSS package



export default function MealType(props) {

    return (
        // <Tippy  content={`Click on the card to proceed to ${props.heading} Section`}>
        <div className='card'>
            <Link to={`/${props.heading}`}  >
                
                    <img src={props.image} alt={props.heading} className='image' />
                    <div className='mealInfo'>
                        <h3>{props.heading}</h3>
                        <h4>{props.info}</h4>
                    </div>
         
            </Link>
        </div>
            //    </Tippy>
    )
}
