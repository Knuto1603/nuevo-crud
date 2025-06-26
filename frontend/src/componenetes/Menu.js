import React from "react";
import { Nav } from "react-bootstrap";




function Menu() {
    return (
    <Nav  className="menu" defaultActiveKey="../componenetes/Inicio">
      <Nav.Link href="/Inicio">Inicio</Nav.Link>
      <Nav.Link href="/caracteristicas">Características</Nav.Link>
      <Nav.Link href="/pricing">Precios</Nav.Link>
      <Nav.Link href="/articulos">Articulos</Nav.Link>
      <Nav.Link button onClick={() => { localStorage.removeItem('token'); 
                 window.location.href = '/'; }}>Cerrar sesión</Nav.Link>

 
    </Nav>
  );

}
export default Menu;