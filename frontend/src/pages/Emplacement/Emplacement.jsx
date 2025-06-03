import React from 'react'
import Navbar from '../../composants/Navbar/Navbar'
import './Emplacement.css'
import emp1 from '../../assets/emp1.jpeg'
import LeafletMap from '../../composants/LeafletMap'
import Footer from '../../composants/Footer/Footer'

export default function Emplacement() {
  return (
    <div>
        <Navbar />

        <div className="emp-container">
          <div className="section1">
            <img className='emp1' src={emp1} alt="position" />
             <p>Bienvenue dans notre magasin de location de voitures idéalement situé au cœur de la ville. Situé dans un emplacement, notre magasin offre un accès facile et une plaque tournante centrale pour tous vos besoins de location de voiture. Que vous soyez Un résident local ou un voyageur explorant la région, nous trouver est un jeu d’enfant.
              <br />
              <br />
                Notre magasin est stratégiquement situé à proximité des principaux centres de transport, notamment les aéroports, les gares, et les gares routières, ce qui vous permet de prendre et de déposer votre véhicule de location très pratique. À votre arrivée, notre personnel amical vous accueillera chaleureusement, assurant un processus de location fluide et efficace du début à la fin.</p>
          </div>

          <div className="section2">
            <img className='emp2' src={emp1} alt="position" />
            <p>Situé dans un quartier animé, notre magasin est entouré d’une variété de commodités et d’attractions. Vous trouverez un éventail de restaurants, de cafés et de centres commerciaux à une courte distance, parfaits pour manger un morceau ou faire des courses avant ou après votre expérience de location de voiture.
              <br />
              <br /> 
              Avec un grand espace de stationnement disponible sur notre site, vous pouvez facilement vous y rendre en voiture, garer votre propre véhicule et Conduisez avec votre voiture de location en toute simplicité. Nous privilégions votre commodité et notre emplacement est conçu pour minimiser les désagréments ou les retards, ce qui vous permet de vous concentrer sur votre voyage à venir.</p>
          </div>
        </div>
        <br />
        <LeafletMap />
        <br />
        <br />
        <Footer/>
    </div>
  )
}
