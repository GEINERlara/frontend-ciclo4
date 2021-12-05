import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'

// Dashboard
import DashboardLayout from '../layouts/DashboardLayout'
import AdminHome from '../views/admin/AdminHome'
// Products
import ProductsHome from '../views/admin/products/ProductsHome'
import ProductCreate from '../views/admin/products/ProductCreate'
import ProductEdit from '../views/admin/products/ProductEdit'
import ProductShow from '../views/admin/products/ProductShow'
// Categories
import CategoriesHome from '../views/admin/categories/CategoriesHome'
// Users
import UsersHome from '../views/admin/users/UsersHome'



const DashboardRouter = () => {

  useEffect(() => {
    let htmlTag = document.getElementById('htmlTag')
    htmlTag.style.fontSize = '16px';
    return () => {
      htmlTag.style.fontSize = '10px';
    }
  }, [])

  return (
    <DashboardLayout>
      <Routes>

        <Route path="/" element={ <AdminHome /> } />

        <Route path="/products" element={ <ProductsHome /> } />
        <Route path="/products/create" element={ <ProductCreate /> } />
        <Route path="/products/edit/:id" element={ <ProductEdit /> } />
        <Route path="/products/show" element={ <ProductShow /> } />

        <Route path="/categories" element={ <CategoriesHome /> } />

        <Route path="/users" element={ <UsersHome /> } />

      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRouter
