// src/components/FeaturedCarousel.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FeaturedCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <div>
        <h3>SpectraForce X Series</h3>
        <img src="https://m.media-amazon.com/images/I/81RTaCvV3yL._AC_UF894,1000_QL80_.jpg" alt="Featured 1" />
        <button>Shop Now</button>
      </div>
      <div>
        <h3>Edge Nexus </h3>
        <img src="https://www.edgenexus.io/wp-content/uploads/2025/03/VideoThumbNail.png" alt="Featured 2" />
        <button>Shop Now</button>
      </div>
    </Slider>
  );
};

export default FeaturedCarousel;