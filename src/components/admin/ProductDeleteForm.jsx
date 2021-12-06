import React from 'react'
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../api';

const ProductDeleteForm = ({ id }) => {

  const navigate = useNavigate ()

  const handleSubmit = (e) =>{
    e.preventDefault()
    let confirm = window.confirm('¿Está seguro de que desea eliminar este producto?');
      if (confirm) {
        deleteProduct(id)
        .then(resp => resp.json())
        .then(data => {
          alert('El producto: ' + data.name + ' ha sido eliminado.')
          navigate ("/admin/products")
        })
      }
  }

  return (
    <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={ handleSubmit }
    sx={{ 
      padding: '24px', 
      boxSizing: 'border-box',
      boxShadow: '0 0 6px #ccc',
      borderRadius: '8px', 
      display:"flex",
      justifyContent:'space-between',
    }}
  >
    <Typography variant="h6">
      ¿Desea eliminar este producto?
    </Typography>
    
    <Button 
          type="submit"
          variant="contained"
          color="secondary"
        >
          Eliminar
    </Button>
    
  </Box>
  )
}

export default ProductDeleteForm
