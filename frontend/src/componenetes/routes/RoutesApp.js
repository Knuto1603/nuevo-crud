import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importar páginas
import Login from '../pages/login/Login';
import Inicio from '../pages/inicio/Inicio';
import Articulo  from '../pages/articulo/Articulo';
import Caracteristicas  from '../pages/características/Caracteristicas';

// Importar componentes de rutas
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Importar layout
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';


function AppRoutes() {
    return (
      <Router>
        <Routes>
          {/* Rutas Públicas - Solo para usuarios NO autenticados */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthLayout
                  title="Iniciar Sesión"
                  subtitle="Ingresa tus credenciales para acceder"
                >
                  <Login />
                </AuthLayout>
              </PublicRoute>
            }
          />

          {/* Ruta raíz - Redirige según autenticación */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rutas Privadas - Solo para usuarios autenticados */}
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Inicio />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articulos"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Articulo />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/caracteristicas"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Caracteristicas />
                </MainLayout>
              </PrivateRoute>
            }
          />



          {/* Ruta 404 - Para páginas no encontradas */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <h2>404 - Página no encontrada</h2>
                <p>La página que buscas no existe.</p>
              </div>
            }
          />
        </Routes>
      </Router>
    );
}

export default AppRoutes;