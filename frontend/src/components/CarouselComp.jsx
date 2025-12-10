import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'

function CarouselComp() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
   <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="carousel-slide">
          <h2>First Slide</h2>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Button href='/products'>View Products</Button>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-slide">
          <h2>Second Slide</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-slide">
          <h2>Third Slide</h2>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;