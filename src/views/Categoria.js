import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getCategories, getProductsByCategory } from '../api';
import PageTitle from '../components/PageTitle';
import ProductsFilter from '../components/ProductsFilter';
import ProductsList from '../components/ProductsList'
import Paginator from '../components/Paginator'
import BreadCrumbs from '../components/BreadCrumbs';
import WebLayout from '../layouts/WebLayout';

const Categoria = props => {

  const { slug } = useParams()

  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])

  const BreadcrumbsLinks = [
      {
          name: 'Inicio',
          path: '/'
      },
      {
          name: 'Categorías',
          path: '/productos'
      },
      {
          name: category.name,
          path: `/categorias/${slug}`
      },
  ] 

  useEffect(() => {
    getCategories()
    .then(resp => resp.json())
    .then(data => {
      let localCategory = data.find(item => {
        return item.slug === slug
      })
      setCategory(localCategory)
      getProducts(localCategory._id)
    })
  }, [slug])

  const getProducts = (id) => {
    getProductsByCategory(id)
    .then(resp => resp.json())
    .then(data => setProducts(data))
  }

  return (
    <WebLayout>
      <BreadCrumbs links={ BreadcrumbsLinks } />
      <PageTitle title={ category.name }/>
      <ProductsFilter />
      <ProductsList products={ products } />
      <Paginator />
    </WebLayout>
  )
}

export default Categoria