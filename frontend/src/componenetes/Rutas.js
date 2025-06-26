import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Inicio from "./Inicio";
import Footer from "./Footer";
import Header from "./Header";
import Menu   from './Menu';
import Login  from './Login';
import Articulo  from './articulo/Articulo';
import Principal from '../App';
import Caracteristicas from './Caracteristicas';


function App() {
    const isAuthenticated = localStorage.getItem('token'); // Verifica si hay sesión activa

    return (
        
        <Router>
            <Header />
            <Menu />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/cuerpo" /> : <Login />} />
                <Route path="/menu" element={isAuthenticated ? <Principal/> : <Navigate to="/" />} />

                <Route path="/inicio" element={isAuthenticated ? <Inicio/> : <Navigate to="/" />} />
                <Route path="/caracteristicas" element={isAuthenticated ? <Caracteristicas/> : <Navigate to="/" />} />
                <Route path="/articulos" element={isAuthenticated ? <Articulo/> : <Navigate to="/" />} />
            </Routes>
             <Footer />
        </Router>
    );
}

export default App;


