import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getCategories, getProductsByCategory } from '../api';
import PageTitle from '../components/PageTitle';
import ProductsFilter from '../components/ProductsFilter';
import SiteHeader from '../components/SiteHeader';
import ProductsList from '../components/ProductsList'
import SiteFooter from '../components/SiteFooter'
import Paginator from '../components/Paginator'

const Categoria = props => {

  const { slug } = useParams()

  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])

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
    <>
      <SiteHeader />
      <PageTitle title={ category.name }/>
      <ProductsFilter />
      <ProductsList products={ products } />
      <Paginator />
      <SiteFooter />
    </>
  )
}

export default Categoria