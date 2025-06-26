import React from "react";
import { Nav } from "react-bootstrap";
import "./NavBar.css"; // Import your CSS file for styling

const NavBar = () => {
  return (
    <Nav  className="navbar-p" defaultActiveKey="../componenetes/Inicio">
      <Nav.Link href="/Inicio">Inicio</Nav.Link>
      <Nav.Link href="/articulos">Articulos</Nav.Link>
      <Nav.Link href="/caracteristicas">Características</Nav.Link>
      <Nav.Link href="/pricing">Precios</Nav.Link>
       <Nav.Link id="logout" button onClick={() => { localStorage.removeItem('token'); 
                 window.location.href = '/'; }}>Cerrar sesión</Nav.Link>
    </Nav>
  );
};


export default NavBar;