import React from 'react'
import '../../../Style/Pages/NoData.scss'
import nodata from '../../../Assets/empty.gif'

export default function NoData() {
  return (
    <div className='noData'>
        <img src={nodata} alt="" />
        <h1>Sorry!....We could not find any Restautant</h1>
    </div>
  )
}
