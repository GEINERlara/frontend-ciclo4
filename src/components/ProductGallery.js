import React from 'react'
import { useState } from 'react'
import './ProductGallery.css'

const ProductGallery = ({ images }) => {

  const [mainImage, setMainImage] = useState('/images/productos/cel.png')

  const handleClick = (e) => {
      if (e.target.src !== undefined && e.target.src !== mainImage) {
          setMainImage(e.target.src)
      }
  }

  const ImagesListItem = () => {
    return (
      <li className="product-gallery__list-item">
        <img 
          src="/images/productos/cel.png" 
          alt="Hay que pasarle un alt" 
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
              images.map((image, idx) => <ImagesListItem key={ idx } image={ image } />)
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
