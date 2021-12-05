import React from "react";
import Slider from "infinite-react-carousel";
import "./CoverSlider.css";

const CoverSlider = ({ images }) => {
  
  const settings = {
    autoplay: true,
    arrows: false,
    dots: true
  };

  return (

    <section className="slider">
      <Slider className="slider-content" {...settings}>
        {images.map((image) => {
          return (
            <div 
              key={image.id} 
              className="slider__item-wraper"
            > 
              <div className="slider__item"
                style={{ backgroundColor: image.color }}>

                {/* <img src={image.image} alt={image.title} /> */}
                <p className="slider__item-description">
                  <a href="/">
                      {image.title}
                  </a>
                </p>

              </div>
            </div>
          )
        })
        }
      </Slider>
    </section>
  );
};

export default CoverSlider;
