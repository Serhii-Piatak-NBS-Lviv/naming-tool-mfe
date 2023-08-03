import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import SwiperCore, { Mousewheel } from "swiper/core";
import 'swiper/css/navigation';
import 'swiper/css';

import { cx, css } from '@emotion/css';

import SwiperCategoryItem from './SwiperCategoryItem';
import GenderSelection from './GenderSelection';

import { setSelectedCategory, setGender, setLetter } from './filterSlice';
import { AlphabetSelector } from './AlphabetSelector';

const cssSwiperNesting = css`
    & .swiper {
        max-width: 94%;
        position: static;
        padding: 0 9px;

        @media (max-width: 768px) {
            /* padding: 0 9px 0 15px; */
        }
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

const FormFilters = ({ restAPI, title }) => {    

    const [cssFormFiltersTitle] = useThemifiedComponent('form-filters-title');
    const [cssFormFiltersWrapper] = useThemifiedComponent('form-filters-wrapper');
    const [cssSwiperWrapper] = useThemifiedComponent('filters-swiper-wrapper'); 

    SwiperCore.use([Mousewheel]);
    
    const dispatch = useDispatch();  
    const { t } = useTranslation();

    const handleFilter = (category) => {
        dispatch(setSelectedCategory(category));
    }

    const handleRadio = (radio) => {
        dispatch(setGender(radio));
      };

    const handleLetter = (letter) => {
        dispatch(setLetter(letter));
    }

    return (
        <>
            <p className={cssFormFiltersTitle}>
                {title}
            </p>
            <div className={cssFormFiltersWrapper}>
                <div className={cx(cssSwiperWrapper)}>
                    <div className={cssSwiperNesting}  mx="auto">
                        <Swiper
                            position="static"
                            modules={[Navigation, A11y]}
                            spaceBetween={8}
                            navigation
                            mousewheel={true}
                            // slidesPerView={'auto'}
                            // loop={'true'}
                            // watchOverFlow={'true'}
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
                </div>
                <GenderSelection
                    title={t('filter gender selector title')}
                    radios={[
                        t('filter gender female'),
                        t('filter gender male'),
                        t('filter gender both')
                    ]}
                    handleRadio={handleRadio}
                />              
                <AlphabetSelector handleLetter={handleLetter} />  
            </div>            
        </>
    )
}

export default FormFilters;
