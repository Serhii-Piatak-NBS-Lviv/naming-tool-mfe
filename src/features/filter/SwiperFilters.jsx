import { css } from '@emotion/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import SwiperCore, { Mousewheel } from "swiper/core";
import 'swiper/css/navigation';
import 'swiper/css';

import SwiperCategoryItem from './SwiperCategoryItem';

const cssSwiperNesting = css`
    & .swiper {
        max-width: 94%;
        position: static;
        padding: 0 9px;
    };

    & .swiper .swiper-wrapper {
        align-items: center;
    }

    & .swiper .swiper-slide {
        width: fit-content;
    }

    & .swiper .swiper-button-next, & .swiper .swiper-button-prev {
        top: 50%;
        width: auto;
        transition: .3s;        
    };

    & .swiper .swiper-button-next {
        right: 0px;
    };

    & .swiper .swiper-button-prev {
        left: 0px;
    };

    & .swiper .swiper-button-disabled {
        opacity: 0;
    }

    & .swiper .swiper-button-prev:after {
        content: '';
        display: inline-block;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 19L6.5 12L17 5" stroke="%233A3533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        height: 24px;
        width: 24px;
    }

    & .swiper .swiper-button-next:after {
        content: '';
        display: inline-block;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 19L18.5 12L8 5" stroke="%233A3533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        height: 24px;
        width: 24px;
    }
`;

export const SwiperFilters = ({restAPI, handleFilter}) => {

    SwiperCore.use([Mousewheel]);
    return (
        <div className={cssSwiperNesting}  mx="auto">
            <Swiper
                position="static"
                modules={[Navigation, A11y]}
                spaceBetween={8}
                navigation
                mousewheel={true}

                breakpoints={{
                    0: {
                        slidesPerView: 4,
                    },
                    // 424: {
                    //     slidesPerView: 4,
                    // },
                    525: {
                        slidesPerView: 5,
                    },
                    769: {
                        slidesPerView: 3,
                    },                                
                    900: {
                        slidesPerView: 3.5,
                    },
                    1139: {
                        slidesPerView: 5,
                    }
                }}
            >
                {restAPI.list.map((category) => {
                    return (
                        <SwiperSlide key={category.id}>
                            <SwiperCategoryItem 
                                category={category} 
                                handleFilter={handleFilter} 
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>        
    )
}
