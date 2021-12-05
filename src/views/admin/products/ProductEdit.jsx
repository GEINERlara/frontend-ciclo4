import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router'
import ProductForm from '../../../components/admin/ProductForm'
import { getProductById, updateProduct } from '../../../api'
import ProductDeleteForm from '../../../components/admin/ProductDeleteForm'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom'

const Edit = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [product, setProduct] = useState({})

  // const BreadcrumbsLinks = [
  //   <Link key="1" to="/admin">Dashboard</Link>,
  //   <Link key="2" to="/admin/products">Productos</Link>,
  //   <Link key="3" to="#">Editar</Link>
  // ]

  useEffect(() => {
    getProductById(id)
    .then(resp => resp.json())
    .then(data => setProduct(data))
    .catch(err => console.log(err.message))
  }, [id])

  const handleSubmit = (data) => {
    updateProduct(id, data)
    .then(resp => {
      if (resp.ok) {
        alert('El producto se actualizó correctamente')
        navigate('/admin/products')
      }
    })
    .catch(err => console.log(err.message))
  }
  
  const handleDiscard = () => {
    navigate('/admin/products')
  }

  return (
    <>
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        { BreadcrumbsLinks }
      </Breadcrumbs> */}

      <Container maxWidth="md">
        <Typography variant="h4" mt={3}>
          Editar producto
        </Typography>

        <Box my={3}>
          <ProductForm
            actionButton="Actualizar"
            { ...product }
            handleSubmit={ handleSubmit }
            handleDiscard={ handleDiscard }
          />
        </Box>

        <Box my={5}>
          <ProductDeleteForm />
        </Box>
      </Container>
    </>
  )
}

export default Edit
