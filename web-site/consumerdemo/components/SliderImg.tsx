import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimpleSlider=()=> {
  const settings = {
    dots: true,
    dotsClass:'slick-dots1',//自定义指示器的样式
    // dots: {'dot-style':String},
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    height:500}

      return (
          <div style={{margin:'50px 12px 40px 12px'}}>
              <h2> Single Item</h2>
              <Slider {...settings}>
                  <div>
                      <h3>1</h3>
                      <div style={{background:'#25f5f5',height:'160px'}}>sdfkjsdlfjldskfjlksjdf</div>
                  </div>
                  <div>
                      <h3>2</h3>
                  </div>
                  <div>
                      <h3>3</h3>
                  </div>
                  <div>
                      <h3>4</h3>
                  </div>
                  <div>
                      <h3>5</h3>
                  </div>
                  <div>
                      <h3>6</h3>
                  </div>
              </Slider>
          </div>
      );
  }
}

export default  SimpleSlider