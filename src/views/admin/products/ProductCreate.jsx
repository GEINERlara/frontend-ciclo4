import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import ProductForm from '../../../components/admin/ProductForm'
import { storeProduct } from '../../../api'
import { useNavigate } from 'react-router'

//firebase
import storage from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux'
import { setDashboardTitle } from '../../../actions/ui'

const Create = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( setDashboardTitle('Producto / Crear') )
  }, [])

  const [images, setImages] = useState([])

  useEffect(() => {
    console.log('se actualizo lista de imagenes', images);
  }, [images])

  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    //1 firebase
    console.log(`Start upload ${images}`);
    let tempURLs = []


    // check files list
    if (images.length <= 0) {
      console.error(`No image was selected`);
      return;
    }
    for (const image of images) {
      const storageRef = ref(storage, `/images/${image.name}`);
      //TODO: Add security to prevent repeat multiple images with the same name
      let snapshot = await uploadBytes(storageRef, image)
      let url = await getDownloadURL(storageRef)
      tempURLs.push(url)
    }
    data.images = tempURLs
    console.log('data.images -> ', data.images);
    //2 mongo
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
