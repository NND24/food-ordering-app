"use client"
import React from 'react'
import './home.css'
import Chart from '../../components/admin-components/Chart/Chart'
import FeaturedInfo from '../../components/admin-components/FeaturedInfo/FeaturedInfo'
import WidgetSmall from '../../components/admin-components/WidgetSmall/WidgetSmall'
import WidgetLarge from '../../components/admin-components/WidgetLarge/WidgetLarge'
import{userData} from "../../components/admin-components/dummy-data"
const home = () => {
  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        <div className="home-widget">
          <WidgetSmall/>
          <WidgetLarge/>
        </div>
    </div>
  ) 
}

export default home
