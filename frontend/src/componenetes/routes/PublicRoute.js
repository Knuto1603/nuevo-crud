import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente para rutas públicas (como login)
 * Redirige a dashboard si ya está autenticado
 */
const PublicRoute = ({ children }) => {

    // Mostrar loading mientras se verifica la autenticación
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated) {
        return <Navigate to="/inicio" replace />;
    }

    // Si no está autenticado, mostrar el contenido (login)
    return children;
};

export default PublicRoute;
// Este componente se utiliza para proteger rutas públicas
// y redirigir a los usuarios autenticados al dashboard.
// Se usa en el archivo RoutesApp.js para la ruta de login.