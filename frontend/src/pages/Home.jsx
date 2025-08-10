import React from 'react'
import './Home.css'
import Navbar from '../composants/Navbar/Navbar'
import Body from '../composants/Body/Body'
import Footer from '../composants/Footer/Footer'
import Services from '../composants/Services/Services'
import Comment from '../composants/Comment/Comment'

export default function Home() {
  return (
    <div className='bod'>
        <Navbar />
         <br />
        <Body/>
        <Comment/>
        <Services/>
        <Footer />
    </div>
  )
}
