import React, { useState, useEffect } from 'react';

function Bonjour() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 2000 ms = 2 secondes

    // Nettoyage du timer si le composant se démonte avant
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // Ne rien afficher après 2s

  return (
    <div style={{ fontSize: 24, textAlign: 'center', marginTop: 50 }}>
      Bonjour
    </div>
  );
}

export default Bonjour;
