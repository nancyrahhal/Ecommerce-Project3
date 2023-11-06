import { Navigation,Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./Carousel.css";    




const Carousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      navigation={true} // Enable navigation
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="Backgroundimage"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="Backgroundimage2"></div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
