import React, { useState } from 'react';
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

  // Current slide tracking
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate number of pages (for dots)
  const itemsPerPage = 5; // Match slidesToShow
  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage);
  
  // Settings for react-slick carousel
  const settings = {
    dots: false, // Disable the built-in dots, we'll create our own
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (current, next) => {
      setCurrentSlide(next / itemsPerPage); // Update current slide for custom dots
    },
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
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

  // Go to specific slide
  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index * itemsPerPage);
    }
  };

  // Custom dots component
  const renderCustomDots = () => {
    return (
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? '#101820' : '#ccc',
              margin: '0 5px',
              cursor: 'pointer',
              transform: currentSlide === index ? 'scale(1.3)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="highlighted-products-container" style={{ position: 'relative', paddingBottom: '70px' }}>
      <div className="slider-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
        <Slider ref={sliderRef} {...settings}>
          {featuredProducts.map(product => (
            <div key={product.id} className="carousel-item">
              <ProductHighlightCard product={product} />
            </div>
          ))}
        </Slider>
        {renderCustomDots()} {/* Our custom dots */}
      </div>
      <div className="navigation-container" style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
        <div className="arrows-container">
          <PrevArrow onClick={goToPrev} />
          <NextArrow onClick={goToNext} />
        </div>
      </div>
    </div>
  );
};

export default HighlightedProductsCarousel;