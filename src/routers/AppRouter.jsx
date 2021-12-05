import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../views/Home';
import Productos from "../views/Productos";
import Producto from "../views/Producto";
import Categoria from '../views/Categoria';
import Nosotros from "../views/Nosotros";
import Contacto from "../views/Contacto";

import Login from "../views/login/Login"

import DashboardRouter from './DashboardRouter';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:slug" element={<Producto />} />
        <Route path="categorias/:slug" element={<Categoria />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />

        <Route path="login" 
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />

        <Route path="admin/*" 
          element={ 
            <PrivateRouter>
              <DashboardRouter /> 
            </PrivateRouter>
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
