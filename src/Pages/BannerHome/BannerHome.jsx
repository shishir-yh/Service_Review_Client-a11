import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
    // Slides data
    const slides = [
        {
            image: 'https://i.ibb.co/RPv48Wz/1-1.jpg',
            text: 'Unlock your potential with the best online courses!',
        },
        {
            image: 'https://i.ibb.co/FDYbFQm/1-2.jpg',
            text: 'Take the first step towards your dream career today.',
        },
        {
            image: 'https://i.ibb.co/txTw617/1-3.jpg',
            text: 'Learn anytime, anywhere. Your future starts now.',
        },
        {
            image: 'https://i.ibb.co/VBpv1Qq/1.jpg',
            text: 'Discover skills that change your life and inspire others.',
        },
    ];

    return (
        <div className="w-full">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative">
                            <img
                                src={slide.image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[400px] md:h-[500px] lg:h-[700px] "
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-white via-blue-500 to-transparent text-white text-center">
                                <p className="text-lg md:text-xl lg:text-2xl font-bold">
                                    {slide.text}
                                </p>
                            </div>


                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
