import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import ProductForm from '../../../components/admin/ProductForm'
import { storeProduct } from '../../../api'
import { useNavigate } from 'react-router'

//firebase
import storage from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Create = () => {

  const [images, setImages] = useState([])

  useEffect(() => {
    console.log('se actualizo lista de imagenes', images);
  }, [images])

  const navigate = useNavigate()

  const handleSubmit = (data) => {
    storeProduct(data)
    .then(resp => {
      if (resp.ok) {
        alert('El producto se creó correctamente')
        navigate('/admin/products')
      }
    })
    .catch((err) => console.log(err))
  }
  
  const handleDiscard = () => {
    navigate('/admin/products')
  }

  return (
    <>
    BreadCrumbs
      <Container maxWidth="md">
        <Typography variant="h4" mt={3}>
          Crear producto
        </Typography>

        <Box my={3}>
          <ProductForm 
            actionButton="Crear"
            handleSubmit={ handleSubmit }
            handleDiscard={handleDiscard}
            images={images}
            setImages={setImages}
          />
        </Box>
      </Container>
    </>
  )
}

export default Create
