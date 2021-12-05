import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import ProductFeaturesInputList from './ProductFeaturesInputList';
import ProductImagesForm from './ProductImagesForm';

const ProductForm = (props) => {

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState([])
  // const [images, setImages] = useState([])
  // const [category_id, setCategory_id] = useState(category_id)
  const [status, setStatus] = useState('')

  const setValues = (data) => {
    setName(data.name)
    setSlug(data.slug)
    setPrice(data.price)
    setDescription(data.description)
    setFeatures(data.features)
    // ...
    setStatus(data.status);
  }

  useEffect(() => {
    if (typeof props._id !== 'undefined') {
      setValues(props)
    }
  }, [props._id])

  const handleInputChange = (e, setter) => {
    setter(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: name, 
      slug: slug, 
      price: price, 
      description: description, 
      features: features, 
      // images: images, 
      // category_id: category_id, 
      status: status
    }

    props.handleSubmit(formData)
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
      }}
    >
      <Typography variant="h6">
        Información:
      </Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField  
          label="Nombre:" 
          name="name"
          value={ name }
          onChange={ e => handleInputChange(e, setName) }
          variant="outlined" 
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField 
          label="Slug:" 
          name="slug"
          value={ slug }
          onChange={ e => handleInputChange(e, setSlug) }
          variant="outlined" 
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Precio</InputLabel>
        <OutlinedInput
          name="price"
          value={price}
          onChange={e => handleInputChange(e, setPrice)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          name="description"
          value={ description }
          onChange={ e => handleInputChange(e, setDescription) }
          label="Descripción:" 
          variant="outlined" 
          multiline
          rows={3}
        />
      </FormControl>

      <Divider sx={{ my: 4 }} />

      <ProductFeaturesInputList 
        features={ features }
        setFeatures={ setFeatures }
      />

      <Divider sx={{ my: 4 }} />
      
      <div style={{ display: 'flex' }}>
        <FormControl fullWidth sx={{ mr: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">Categoría:</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            label="Categoría"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Acá</MenuItem>
            <MenuItem value={20}>Hay</MenuItem>
            <MenuItem value={30}>Que</MenuItem>
            <MenuItem value={30}>Iterar</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ ml: 1 }}>
          <InputLabel>Estado:</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={ status }
            label="Age"
            onChange={e => handleInputChange(e, setStatus) }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider sx={{ my: 4 }} />

      <ProductImagesForm />

      <Divider sx={{ my: 4 }} />

      <Stack spacing={2} direction="row" justifyContent="flex-end">
        {/* TODO: Alinear a la derecha */}
        <Button 
          type="button"
          onClick={props.handleDiscard}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button 
          type="submit"
          variant="contained"
        >
          { props.actionButton }
        </Button>
      </Stack>
    </Box>
  )
}

export default ProductForm
