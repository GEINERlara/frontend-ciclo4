import React, { useState, useEffect } from 'react'
import ProductsFilter from '../components/ProductsFilter';
import BreadCrumbs from '../components/BreadCrumbs';
import PageTitle from '../components/PageTitle';
import ProductsList from '../components/ProductsList';
import Paginator from '../components/Paginator'
import WebLayout from '../layouts/WebLayout';
import { getProducts, getProductsByQuery } from "../api";
import { useLocation } from 'react-router';
import queryString from "query-string";


const Productos = () => {

  const BreadcrumbsLinks = [
    {
      name: 'Inicio',
      path: '/'
    },
    {
      name: 'Productos',
      path: '/productos'
    },
  ]

  const location = useLocation()

  const { q = '' } = queryString.parse(location.search)

  const [products, setProducts] = useState([])

  useEffect(() => {
    if (q) {
      getProductsByQuery(q)
      .then(resp => resp.json())
      .then(resp => setProducts(resp))
    } else {
      getProducts()
      .then(resp => resp.json())
      .then(resp => setProducts(resp))
    }
  }, [q])

  return (
    <WebLayout>
      <BreadCrumbs links={ BreadcrumbsLinks }/>
      <PageTitle title="PRODUCTOS"/> 
      <ProductsFilter />
      <ProductsList products={ products } />
      {/* <Paginator /> */}
    </WebLayout>
  )
}

export default Productos
