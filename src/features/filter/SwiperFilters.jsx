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

    & .swiper .swiper-button-next:after, & .swiper .swiper-button-prev:after {
        color: #3A3533;
        font-weight: 600;
        font-size: 20px;        
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
                        slidesPerView: 3.5,
                    },
                    424: {
                        slidesPerView: 4,
                    },
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
