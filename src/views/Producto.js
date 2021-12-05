import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductBySlug, getProductsByCategory } from '../api';
import useMediaQuery from '../hooks/useMediaQuery'
import SiteHeader from '../components/SiteHeader'
import BreadCrumbs from '../components/BreadCrumbs'
import ProductsFilter from '../components/ProductsFilter'
import ProductsList from '../components/ProductsList'
import SiteFooter from '../components/SiteFooter'


import './Producto.css'
import ProductGallery from '../components/ProductGallery';

function Producto() {

    const { slug } = useParams();
    
    const [name, setName] = useState('')
    const [images, setImages] = useState([])
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState([])
    const [category_id, setCategory_id] = useState('')
    const [relatedProducts, setRelatedProducts] = useState([])

    const isPageWide = useMediaQuery('(min-width: 768px)')
  
    useEffect(() => {
      getProductBySlug(slug)
      .then(resp => resp.json())
      .then(data => setValues(data) )
    }, [slug])

    useEffect(() => {
        if (category_id) {
            getRelatedProducts(category_id)
        }
    }, [category_id])

    const setValues = (p) => {
        setName(p.name)
        setImages(p.images)
        setPrice(p.price)
        setDescription(p.description)
        setFeatures(p.features)
        setCategory_id(p.category_id)
    }

    const getRelatedProducts = (id) => {
        getProductsByCategory(id)
        .then(resp => resp.json())
        .then(resp => {
            let products = resp.splice(0, 3)
            setRelatedProducts(products)
        })
    }

    const productTitle = (
        <h1 className="product-page__title sub-title">
            { name }
        </h1>
    )

    const featuresList = features.map((feature, idx) => (
        <li key={idx}
            className="product-page__features-item"> 
            { feature } 
        </li>
    ))

    const RelatedProducts = () => {
        return (
                    // <h2 className="related-products__title sub-title">Productos relacionados</h2>
                    <ProductsList 
                        products={ relatedProducts } 
                        h2="Productos relacionados"
                    />
        )
    }

    return ( 
        <>
        <SiteHeader />
        <BreadCrumbs />
        <ProductsFilter />
        <main className="product-page box">
            <div className="box__container">

                <div className="product-page__overview">
                    
                    { isPageWide ? '' : productTitle }

                    <ProductGallery 
                        images={ images } 
                    />
                    
                    <div className="product-page__info">
                        
                        { isPageWide ? productTitle : '' }

                        <p className="product-page__description">
                            { description }
                        </p>
                        <div className="product-page__price sub-title">
                            $ { price.toLocaleString("es-ES") }
                        </div>
                        <button className="product-page__button button">
                            COMPRAR
                        </button>
                    </div>

                </div>
                <div className="product-page__features">
                    <h2 className="product-page__features-title">CARACTERÍSTICAS:</h2>
                    <ul className="product-page__features-list">
                        {featuresList}
                    </ul>
                </div>
            </div>
        </main>

        <RelatedProducts />
        <SiteFooter />
        </>
    );
}

export default Producto;
