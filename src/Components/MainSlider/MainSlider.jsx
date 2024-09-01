import React, { useState } from 'react'
import style from './MainSlider.module.css'
import image1 from '../../assets/images/slider-image-1.jpeg'
import image2 from '../../assets/images/slider-image-2.jpeg'
import image3 from '../../assets/images/slider-image-3.jpeg'
import image4 from '../../assets/images/grocery-banner.png'
import image5 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000
  };
  

  return <>
    
    <div className="row my-7 shadow-lg">
    
      <div className='w-1/2'>
      <Slider {...settings}>
        <img src={image3} className='w-full h-[200px] md:h-[400px]' alt="" />
        <img src={image4} className='w-full h-[200px] md:h-[400px]' alt="" />
        <img src={image5} className='w-full h-[200px] md:h-[400px]' alt="" />
        </Slider>
      </div>
      <div className='w-1/2'>
      <img src={image2} className='w-full h-[100px] md:h-[200px]' alt="" />
      <img src={image3} className='w-full h-[100px] md:h-[200px]' alt="" />
      </div>
      </div>  
  </>
}
