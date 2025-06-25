import React, { useState, useEffect } from "react";
import "../componenetes/css/cuerpo.css";


const Cuerpo = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cuerpo">
        <h1>Es una aplicacion que se esta en construccion</h1>
        <img className="image-cuerpo" src="./imagenes/mancora.jpg" alt="Logo"/>
        <p>
            
        </p>

    </div>
    
  );
};



export default Cuerpo;