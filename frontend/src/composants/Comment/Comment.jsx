import React from "react";
import { motion } from "framer-motion";
import "./Comment.css";

export default function Comment() {
  const steps = [
    {
      step: "1",
      title: "Choisissez votre voiture",
      desc: "Parcourez notre catalogue et sélectionnez la voiture idéale selon vos besoins."
    },
    {
      step: "2",
      title: "Réservez en ligne",
      desc: "Complétez votre réservation en quelques clics, sans frais cachés."
    },
    {
      step: "3",
      title: "Récupérez et partez",
      desc: "Récupérez votre voiture au point de retrait choisi et profitez de votre voyage."
    }
  ];

  return (
    <section className="how-section">
      <motion.h2
        className="how-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        🚘 Comment ça marche ?
      </motion.h2>

      <div className="how-container">
        {steps.map((s, index) => (
          <motion.div
            className="how-card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="how-step">{s.step}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
