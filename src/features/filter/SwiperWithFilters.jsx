import { useDispatch } from 'react-redux';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { css, cx } from '@emotion/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
// import './CategorySwiper.css';

import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import SwiperItem from './SwiperItem';
import SelectedFilters from './SelectedFilters';
import { setSelectedCategory } from './filterSlice';

const cssSwiperNesting = css`
    & .swiper {
        max-width: 94%;
        position: static;
    };

    & .swiper .swiper-button-next, & .swiper .swiper-button-prev {
        top: 65px;
    };

    & .swiper .swiper-button-next {
        right: -7px;
    };

    & .swiper .swiper-button-prev {
        left: -7px;
    };

    & .swiper .swiper-button-next:after, & .swiper .swiper-button-prev:after {
        color: #3A3533;
        font-weight: 600;
        font-size: 20px;
    }
`;

const SwiperWithFilters = ({ restAPI, title }) => {
    const dispatch = useDispatch();

    const countOfSlides = (maxCount) => {
        return restAPI.list.length > maxCount
            ? maxCount
            : restAPI.list.length;
    }
    const isScrollbar = window.innerWidth > 768 ? false : { draggable: true };

    const [cssCategoriesTitle] = useThemifiedComponent('filters-categories-title');
    const [cssSwiperWrapper] = useThemifiedComponent('filters-swiper-wrapper');

    const handleFilter = (category) => {
        dispatch(setSelectedCategory(category));
    }

    return (
        <>
            <h3 className={cssCategoriesTitle}>
                {title}
            </h3>
            <div className={cx(cssSwiperWrapper,cssSwiperNesting)}>
                <Swiper
                    modules={[Navigation, Scrollbar, A11y]}
                    spaceBetween={20}
                    navigation
                    scrollbar={isScrollbar}
                    breakpoints={{
                        320: {
                            slidesPerView: 3.2,
                            spaceBetween: 16
                        },
                        480: {
                            slidesPerView: 3.6,
                        },
                        640: {
                            slidesPerView: countOfSlides(4),
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: countOfSlides(5),
                        },
                        1024: {
                            slidesPerView: countOfSlides(6),
                        },
                        1139: {
                            slidesPerView: countOfSlides(7),
                        }
                    }}>
                    {
                        restAPI.list.map((category, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <SwiperItem {...category} handleFilter={handleFilter} />
                                </SwiperSlide>
                            )
                        })
                    }
                    <SelectedFilters handleFilter={handleFilter} />
                </Swiper>
            </div>
        </>

    )
}

export default SwiperWithFilters;
