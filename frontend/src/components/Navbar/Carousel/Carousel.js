import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons from react-icons/fa

import './Carousel.css'; // Import the CSS file

const ImageCarousel = () => {
  const images = [
    'https://dealroup.com/wp-content/uploads/2020/05/Grocery-Offers.jpg',
    'https://www.bigwhite.com/sites/default/files/2016-07/Winter-Services-Groceries-Food-2000x800px.jpg',
    'https://www.zopmart.in/wp-content/uploads/2020/11/grocery-shopping-discount-banner.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    console.log('Next slide clicked');
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  
  const goToPrevSlide = () => {
    console.log('Previous slide clicked');
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleSeeAll = () => {
    // Add your logic for handling the "See All" action here
    console.log('See All clicked');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 2500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="image-carousel">
      <button className="see-all-button" onClick={handleSeeAll}>See All</button>
      <button className="carousel-button left-button" onClick={goToPrevSlide}>
        <FaChevronLeft />
      </button>
      <div
        className="carousel-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        alt={`Slide ${currentIndex + 1}`}
      />
      <button className="carousel-button right-button" onClick={goToNextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageCarousel;
