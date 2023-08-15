import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import restAPI from '../../app/apisimul/filter/name-categories';
import { toggleLoader } from '../../app/commonSlice';

import { useDispatch } from 'react-redux';

import { cx } from '@emotion/css';

import GenderSelection from './GenderSelection';
import { AlphabetSelector } from './AlphabetSelector';
import { SwiperFilters } from './SwiperFilters';

import { setSelectedCategory, setGender, setLetter } from './filterSlice';

/**
* @restAPI  - list of name categories will come from 
Drupal back-end. For first develop iteration static JSON
used from src/app/apisimul  folder
* @function Filter
* When Filter component being monted to the page, list
* of name categories should be fetched from backend, pushed
* to filterSlice part of Redux storage
**/

const LOADING_OVERLAY_DURATION = 800;

const Filter = () => {
    const [cssFiltersContainer] = useThemifiedComponent('filters');
    const [cssFormFiltersTitle] = useThemifiedComponent('form-filters-title');
    const [cssFormFiltersWrapper] = useThemifiedComponent('form-filters-wrapper');
    const [cssSwiperWrapper] = useThemifiedComponent('filters-swiper-wrapper');     
    
    const dispatch = useDispatch();  
    const { t } = useTranslation();

    const showLoader = (duration) => {
        dispatch(toggleLoader());
        window.setTimeout(() => dispatch(toggleLoader()), duration);
    };

    const handleFilter = (category) => {
        dispatch(setSelectedCategory(category));
        showLoader(LOADING_OVERLAY_DURATION);
    };

    const handleRadio = (radio) => {
        dispatch(setGender(radio));
        showLoader(LOADING_OVERLAY_DURATION);
    };

    const handleLetter = (letter) => {
        dispatch(setLetter(letter));
        showLoader(LOADING_OVERLAY_DURATION);
    };  

    return (
        <div className={cssFiltersContainer} id="filters" >
           <p className={cssFormFiltersTitle}>
                {t('filter slider title')}
            </p>
            <div className={cssFormFiltersWrapper}>
                <div className={cx(cssSwiperWrapper)}>
                    <SwiperFilters 
                        restAPI={restAPI} 
                        handleFilter={handleFilter} 
                    />
                </div>
                <GenderSelection
                    title={t('filter gender selector title')}
                    handleRadio={handleRadio}
                    radios={[
                        t('filter gender female'),
                        t('filter gender male'),
                        t('filter gender both')
                    ]}                    
                />              
                <AlphabetSelector handleLetter={handleLetter} />  
            </div>              
        </div>
    )
};

export default Filter;