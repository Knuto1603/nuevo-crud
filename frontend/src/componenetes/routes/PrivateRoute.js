import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente que protege rutas privadas
 * Solo permite acceso a usuarios autenticados
 */
const PrivateRoute = ({ children }) => {
   
    // Aquí podrías usar un contexto o un hook para verificar la autenticación
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, mostrar el contenido
    return children;
};

export default PrivateRoute;