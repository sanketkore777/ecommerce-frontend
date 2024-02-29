import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ImageData from './MainCarouselData';

const items = ImageData.map((item) => <img className='cursor-pointer' src={item} alt='' role='presentation' />
);

const MainCarousel = () => (
    <div className='z-0 relative'>
        <AliceCarousel
            disableButtonsControls
            autoPlay
            autoHeight
            infinite
            items={items}
            autoPlayInterval={2000}
            animationDuration={1000}
        />
    </div>
);

export default MainCarousel