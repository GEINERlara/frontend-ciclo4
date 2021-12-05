import React from 'react'
import { Typography } from '@mui/material'

const ProductImagesForm = () => {
  return (
    <div>
      <Typography variant="h6">
        Imágenes:
      </Typography>
      Acá va la parte de selección de imagenes.
      <br />
      Hay que poner un input:file oculto y un button
      <br />
      Hay que poner una galería que iteré el array de imagenes seleccionadas.
      <br />
      Hay que configurar todo lo de imágenes.
      <br />
      Quizá conviene crear un segundo form sólo para imágenes.
    </div>
  )
}

export default ProductImagesForm
