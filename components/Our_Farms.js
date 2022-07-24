import React from 'react';
import Image from 'next/image';
import farm1 from './../assets/images/farm-Logo-1.svg';
import farm2 from './../assets/images/farm-Logo-2.svg';
import farm3 from './../assets/images/farm-Logo-3.svg';
import farm4 from './../assets/images/farm-Logo-4.svg';
import farm5 from './../assets/images/farm-Logo-5.svg';
import farm6 from './../assets/images/farm-Logo-6.svg';

const OurFarms = () => {
    const images = [farm1, farm2, farm3, farm4, farm5, farm6];
    return (
        <div className='our-farms'>
            <div className='container'>
                <h2>Our Farms</h2>
                <div className='logos'>
                    {images.map((image, index) => {
                        return (
                            <div key={index} className='image'>
                                <Image src={image} alt='logo' />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default OurFarms