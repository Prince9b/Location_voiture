import React from "react";
import { motion } from "framer-motion";
import { FaCarSide, FaMoneyBillWave, FaHeadset } from "react-icons/fa";
import "./Services.css";

export default function Services() {
  const services = [
    {
      icon: <FaCarSide />,
      title: "Large choix de véhicules",
      description: "Des voitures économiques aux modèles premium, trouvez la voiture qui correspond à vos besoins."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Prix compétitifs",
      description: "Profitez des meilleurs tarifs du marché, sans frais cachés."
    },
    {
      icon: <FaHeadset />,
      title: "Assistance 24/7",
      description: "Notre équipe est disponible à tout moment pour vous aider et répondre à vos questions."
    }
  ];

  return (
    <section className="services-section">
      <motion.h2 
        className="services-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        🚗 Pourquoi nous choisir ?
      </motion.h2>

      <div className="services-container">
        {services.map((service, index) => (
          <motion.div 
            className="service-card" 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
