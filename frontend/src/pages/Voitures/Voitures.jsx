import React, { useState } from 'react'
import './Voitures.css'
import Navbar from '../../composants/Navbar/Navbar'
import Cars from '../../composants/Cars/Cars'
import Footer from '../../composants/Footer/Footer'
import SearchBar from '../../composants/SearchBar/SearchBar'

export default function Voitures() {
  const [resultats, setResultats]= useState('')
    
  return (
    <div>
      <Navbar/>
      <SearchBar onResultsChange={setResultats}/>
      <Cars/>
      {/* <Footer/> */}
    </div>
  )
}
