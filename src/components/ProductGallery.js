import React, { useEffect } from 'react'
import { useState } from 'react'
import './ProductGallery.css'

const ProductGallery = ({ images }) => {

  // const [mainImage, setMainImage] = useState('/images/productos/cel.png')
  const [mainImage, setMainImage] = useState('')
  const [imagesPaths, setimagesPaths] = useState(images)

  useEffect(() => { 
    if (images) {
      setMainImage(images[0])
      setimagesPaths(images)
    }
  }, [images])

  const handleClick = (e) => {
      if (e.target.src !== undefined && e.target.src !== mainImage) {
          setMainImage(e.target.src)
      }
  }

  const ImagesListItem = ({ imagePath }) => {
    return (
      <li className="product-gallery__list-item">
        <img 
          src={ imagePath } 
          alt="Miniatura" 
          onClick={ handleClick }
          className="product-gallery__list-item-img"
        />
      </li>
    )
  }

  return (
    <div className="product-gallery">
        <ul className="product-gallery__list">
            {
              imagesPaths.map((image, idx) => <ImagesListItem key={ idx } imagePath={ image } />)
            }
        </ul>
        <div className="product-gallery__main-box" >
            <img 
              className="product-gallery__main-image" 
              src={ mainImage } 
              alt="main" 
            />
        </div>
    </div>
  )
}

export default ProductGallery
