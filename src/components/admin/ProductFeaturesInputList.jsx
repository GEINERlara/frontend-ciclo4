import React, { useEffect, useState } from 'react'
import { Box, FormControl, OutlinedInput, Typography, IconButton, InputAdornment } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductFeaturesInputList = props => {

  const [features, setFeatures] = useState(["",])

  useEffect(() => {
    setFeatures(props.features)
  }, [props.features])

  const handleInputChange = (e, idx) => {
    let localFeatures = [ ...features ]
    localFeatures[idx] = e.target.value
    setFeatures(localFeatures)
  }

  const handleAddFeature = () => {
    let localFeatures = [...features, ""]
    setFeatures(localFeatures)
  }

  const handleDeleteFeature = (idx) => {
    let localFeatures = [...features]
    localFeatures.splice(idx, 1)
    setFeatures(localFeatures)
  }

  const handleInputBlur = () => {
    let localFeatures = features.filter(feature => feature.trim() !== '')
    props.setFeatures(localFeatures)
  }

  const FeaturesList = features.map((feat, index) => 
    <FormControl key={ index } fullWidth sx={{ mt: 2 }}>
      <OutlinedInput 
        name={ "feature" + index }
        value={ feat }
        onChange={ e => handleInputChange(e, index) }
        onBlur={ handleInputBlur }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => handleDeleteFeature(index)}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )

  return (
    <>
      <Typography variant="h6">
        Características:
      </Typography>
        { FeaturesList }
        <Box
          mt={2}
        >
          <IconButton 
            type="button" 
            onClick={ handleAddFeature }
          >
              <AddCircleOutlineIcon />
          </IconButton>
        </Box>
    </>
  )
}

export default ProductFeaturesInputList
