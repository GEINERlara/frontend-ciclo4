import React, { useState, useEffect } from 'react'
import ProductsFilter from '../components/ProductsFilter';
import SiteHeader from "../components/SiteHeader"
import BreadCrumbs from '../components/BreadCrumbs';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import SiteFooter from '../components/SiteFooter';
import Paginator from '../components/Paginator'

import { getProducts } from "../api";


const Productos = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    .then(resp => resp.json())
    .then(resp => setProducts(resp))
  }, [])

  return (
    <div>
      <SiteHeader />
      <BreadCrumbs />
      <PageTitle title="PRODUCTOS"/> 
      <ProductsFilter />
      <ProductsList products={ products } />
      <Paginator />
      <SiteFooter />
    </div>
  )
}

export default Productos
