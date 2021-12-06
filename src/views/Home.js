import { useState } from "react";
import WebLayout from "../layouts/WebLayout";
import CoverSlider from "../components/CoverSlider";
import ProductsList from "../components/ProductsList";

import { getProducts } from "../api";

import './Home.css'
import { useEffect } from "react";
import CallToAction from "../components/CallToAction";


const SliderImages = [
  {
    id: "1",
    title: "Awesome forest",
    path: '/images/home/slide-3.jpg',
    color: 'khaki'
  },
  {
    id: "2",
    title: "A litle bird.",
    path: '/images/home/slide-2.jpg',
    color: 'lightcyan'
  },
  {
    id: "3",
    title: "The best friend.",
    path: '/images/home/slide-1.jpg',
    color: 'seashell'
  },
];

const HomeDescription = () => {
  return (
    <section className="home-description box">
      <div className="home-description__container box__container">
        <h2 className="home-description__title sub-title">DESCRIPCIÓN</h2>
        <div className="home_description__content">
          <img 
            className="home_description__img"
            src="/images/home/phone.jpg" 
            alt="Foto descripción"
          />
          <p className="home_description__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>
    </section>
  )
}

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    .then(resp => resp.json())
    .then(resp => {
      let localProducts = resp.slice(0, 6)
      setProducts(localProducts)
    })
  }, [])

  return (
    <WebLayout searchBox={ true }>
      <CoverSlider images={SliderImages} />
      <ProductsList 
        products={ products } 
        h2="PRODUCTOS"
      />
      <HomeDescription />
      <CallToAction />
    </WebLayout>
  )
}

export default Home
