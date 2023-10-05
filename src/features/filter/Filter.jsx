import { useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import restAPI from '../../app/apisimul/filter/name-categories';
import { toggleLoader, toggleLoadMoreBtn } from '../../app/commonSlice';

import { useDispatch, useSelector } from 'react-redux';

import GenderSelection from './GenderSelection';
import { AlphabetSelector } from './AlphabetSelector';
import { SwiperFilters } from './SwiperFilters';

import { setSelectedCategory, setGender, setLetter } from './filterSlice';
import { loadAllPetnames, setNamesList } from '../view/viewSlice';

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

    const appliedCategory = useSelector(state => state.filter.selectedCategories);
    const appliedLetter = useSelector(state => state.filter.letter);
    const appliedGender = useSelector(state => state.filter.gender);
    const initialNamesList = useSelector(state => state.common.fetchedNamesList);
    const petNamesLoadMore = useSelector(state => state.view.petnames_portion);
    const isLoadMoreAvail = useSelector(state => state.common.showLoadMore);

    // A little bit tricky logic of interconnected filters :)
    const applyFilters = (category, gender, letter) => {
        let filteredList = initialNamesList;
    
        // If toggling category filter on then:
        if (category && appliedCategory !== category) {
            // apply category filter
            filteredList = filteredList.filter((petname) => petname.categories.includes(category));
            // and apply letter filter if it was previously set:
            if (appliedLetter) {
                filteredList = filteredList.filter((petname) => petname.Title.charAt(0) === appliedLetter);
            };
        };

        // If toggling category filter off then:
        if (category && appliedCategory === category) {
            // apply letter filter if it was previously set:
            if (appliedLetter) {
                filteredList = filteredList.filter((petname) => petname.Title.charAt(0) === appliedLetter);
            };
        };
    
        // If toggling letter filter on then:
        if (letter && appliedLetter !== letter) {
            // apply letter filter
            filteredList = filteredList.filter((petname) => petname.Title.charAt(0) === letter);
            // and apply category filter if it was previously set:
            if (appliedCategory) {
                filteredList = filteredList.filter((petname) => petname.categories.includes(appliedCategory));
            };
        };

        // If toggling letter filter off then:
        if (letter && appliedLetter === letter) {
            // apply category filter if it was previously set:
            if (appliedCategory) {
                filteredList = filteredList.filter((petname) => petname.categories.includes(appliedCategory));
            };
        };

        // if changing gender filter then:
        if(gender) {
            // apply gender filter
            filteredList = filteredList.filter((petname) => petname.Gender === gender);
            // and apply category filter if it was previously set:
            if (appliedCategory) {
                filteredList = filteredList.filter((petname) => petname.categories.includes(appliedCategory));
            };
            // and apply letter filter if it was previously set:
            if (appliedLetter) {
                filteredList = filteredList.filter((petname) => petname.Title.charAt(0) === appliedLetter);
            };
        };
        
        // gender filtration should be applied every time when we're 
        // filtering by another feature
        if(!gender) {
            filteredList = filteredList.filter((petname) => petname.Gender === appliedGender);
        };

        dispatch(loadAllPetnames(filteredList));
        dispatch(setNamesList(filteredList.slice(0, petNamesLoadMore)));
        if (!isLoadMoreAvail) dispatch(toggleLoadMoreBtn());
    };
    
    const refreshNamesList = (category, gender, letter) => {
        if (initialNamesList.length) {
            dispatch(toggleLoader());
            applyFilters(category, gender, letter);
            window.setTimeout(() => dispatch(toggleLoader()), LOADING_OVERLAY_DURATION);
        };
    };

    const handleFilter = (category) => {
        dispatch(setSelectedCategory(category));
        dispatch(setLetter(''))
        refreshNamesList(category, null, null);
    };

    const handleRadio = (radio) => {
        dispatch(setGender(radio));
        refreshNamesList(null, radio, null);
        dispatch(setLetter(''))
    };

    const handleLetter = (letter) => {
        dispatch(setLetter(letter));
        refreshNamesList(null, null, letter);
    };  

    // Sticky filter on mobile
    const [lastScroll, setLastScroll] = useState(0);
    const [stickyClass, setStickyClass] = useState('filter-scroll-up');

    useEffect(() => {
      const handleScroll = () => {
        const currentScroll = window.pageYOffset;
  
        if (currentScroll > lastScroll) {
          setStickyClass('filter-scroll-down');
        } else {
          setStickyClass('filter-scroll-up');
        }
  
        setLastScroll(currentScroll);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [lastScroll]);

    return (
        <div className={cx(cssFiltersContainer, stickyClass)} id="filters">
           <p className={cssFormFiltersTitle}>
                {t('filter slider title')}
            </p>
            <div className={cssFormFiltersWrapper}>
                <div className={cssSwiperWrapper}>
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