import React from 'react';
import Slider from 'react-slick';
import ProductHighlightCard from './ProductHighlightCard';
import './HighlightedProductsCarousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Arrow components for navigation
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
  <div className="custom-arrow custom-prev" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
  </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
  <div className="custom-arrow custom-next" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
  </div>
  );
};

const CustomDots = (dots) => (
    <div className="custom-dots-container">
    {dots}
    </div>
);

const HighlightedProductsCarousel = () => {
  // Dummy data for featured electronic products
  const featuredProducts = [
    {
      id: 1,
      name: "RASPBERRY PI 4",
      category: "SINGLE BOARD COMPUTERS",
      price: "$45.99",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 2,
      name: "ARDUINO UNO",
      category: "MICROCONTROLLERS",
      price: "$23.50",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 3,
      name: "NVIDIA JETSON",
      category: "EDGE AI COMPUTING",
      price: "$99.99",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 4,
      name: "ESP32 DEV KIT",
      category: "IOT DEVELOPMENT",
      price: "$12.95",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 5,
      name: "TEENSY 4.1",
      category: "MICROCONTROLLERS",
      price: "$29.95",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 6,
      name: "MICROCHIP PIC",
      category: "EMBEDDED SYSTEMS",
      price: "$34.50",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 7,
      name: "STM32 NUCLEO",
      category: "MICROCONTROLLERS",
      price: "$19.99",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    },
    {
      id: 8,
      name: "BEAGLEBONE BLACK",
      category: "SINGLE BOARD COMPUTERS",
      price: "$59.95",
      imageUrl: "https://ar.mouser.com/images/marketingid/2017/img/174924105_Microchip_EthernetofEverything.png?v=041124.0458",
    }
  ];

  // Settings for react-slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: dots => CustomDots(dots),
    customPaging: i => (
      <div className="custom-dot"></div>
    ),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Reference to the slider
  const sliderRef = React.useRef(null);

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="highlighted-products-container">
      <Slider ref={sliderRef} {...settings}>
        {featuredProducts.map(product => (
          <div key={product.id} className="carousel-item">
            <ProductHighlightCard product={product} />
          </div>
        ))}
      </Slider>
      <div className="navigation-container">
        <div className="arrows-container">
          <PrevArrow onClick={goToPrev} />
          <NextArrow onClick={goToNext} />
        </div>
      </div>
    </div>
  );
};

export default HighlightedProductsCarousel;