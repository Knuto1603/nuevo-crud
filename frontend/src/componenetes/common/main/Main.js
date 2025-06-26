import React from "react";
import "./Main.css";


const Main = ({ children }) => {
  return (
    <main className="main d-flex flex-column justify-content-center align-items-center"> 
       {children}
    </main>
  );
};



export default Main;