import { Link } from 'react-router-dom';
import './ProductCard.css'

function ProductCard({ name, images = [], price, slug }) {

  return (
    <Link to={`/productos/${slug}`}>
      <div className="product-card">
          <h3 className="product-card__title">
              { name }
          </h3>
          <img className="product-card__img" src={ images[0] } alt={ name } />
          <p className="product-card__price">
              {/* $ { price.toLocaleString("es-ES") } */}
              { price ? `$ ${price.toLocaleString("es-ES")}` : '-' }
          </p>
      </div>
    </Link>
  )
}

export default ProductCard;
