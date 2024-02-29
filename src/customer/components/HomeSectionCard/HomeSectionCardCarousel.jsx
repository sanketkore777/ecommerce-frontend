import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';
import './styles.css';

const responsive = {
    0: { items: 2 },
    568: { items: 4 },
    1024: { items: 6 },
};

function HomeSectionCardCarousel({ products }) {
    return (
        <div className='relative h-auto z-0'>
            <AliceCarousel
                items={products.map((product) => (
                    <HomeSectionCard key={product._id} product={product} />
                ))}
                paddingLeft={5} // Adjust as needed
                paddingRight={5} // Adjust as needed
                responsive={responsive}
                autoHeight
                mouseTracking
                duration={2000}
                disableButtonsControls
            />
        </div>
    );
}

export default HomeSectionCardCarousel;
