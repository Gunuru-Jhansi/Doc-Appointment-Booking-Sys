import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import NearbyHospitalsMap from '../components/NearbyHospitalsMap';

const Home = () => {
  return (
    <div>
      <Header/>
      <NearbyHospitalsMap/>
      <TopDoctors/>
      {/* <SpecialityMenu/> */}
      {/* <Banner/> */}
    </div>
  )
}

export default Home
