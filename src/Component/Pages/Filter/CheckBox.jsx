import React,{useState} from 'react'
import Data from '../../../restauranList.json'


export const cusiuneArr = Data.reduce((total, item) => {
    if (!total.includes(item.cuisine)) {
        total.push(item.cuisine)
    }
    return total
}, [])

export default function CheckBox({checekedCheckbox,handleCheckbox}) {
    


  return (
        cusiuneArr.map((item, index) => {
            return (
                <div key={index}>
                    <input  type='checkbox' name='Cuisine' id={item.split(" ").join("")} value={item.split(" ").join("")} checked={checekedCheckbox[index]} onChange={(e) => handleCheckbox(index,e.target.value)} />
                    <label htmlFor={item.split(" ").join("")}>{item}</label>
                </div>
            )
        })
  )
}
