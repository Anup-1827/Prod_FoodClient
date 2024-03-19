import React,{useState} from 'react'
import Data from '../../../restauranList.json'

export const locationArr = Data.reduce((total, item) => {
    if (!total.includes(item.location)) {
        total.push(item.location)
    }
    return total
}, [])


export default function Dropdown({setSelectLocation}) {

  return (
    <>
    <select className='DrdSelectLoc' onChange={(e) => setSelectLocation(e.target.value)}>
    <option value='all'>Select Location </option>
                {
                    locationArr.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }
    </select>
    </>
  )
}
