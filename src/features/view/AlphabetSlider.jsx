import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { HStack, VStack } from '@chakra-ui/react';
import { MdSwipe } from "react-icons/md";
import { Alert, AlertDescription } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { cx } from '@emotion/css';

import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { themes } from '../../themes';

/**
* @author
* @function 
**/

const Letter = ({value}) => {
    const [isSelected, setSelection] = useState(false);
    const cssItem = useThemifiedComponent('wiev-alphabet-item');
    const cssItemSelected = useThemifiedComponent('wiev-alphabet-item-selected');

    return(
    <div 
    className={cx(
        { [cssItem]: true },
        { [cssItemSelected]: isSelected }
    )}
    onClick={() => setSelection(!isSelected)}>
        { value }
    </div>
   )
};


const AlphabetSlider = ({alphabet}) => {
    const containRef = useRef();
    const [slides, setSlides] = useState([]);
    const [isAlertClosed, setAlertClosed] = useState(false);
    const { t } = useTranslation();

    const cssContainer = useThemifiedComponent('wiev-alphabet-container');
    const cssItem = useThemifiedComponent('wiev-alphabet-item');
    const cssAlert = useThemifiedComponent("view-alphabet-swipe-tip");

    const theme = useSelector(state => state.common.theme);
    const itemWidth = themes[theme]["wiev-alphabet-item"]['width'] || themes['ttt-default']["wiev-alphabet-item"]['width'];

    function chunkArray (items, size) {  
        const chunks = []
        items = [].concat(...items)
      
        while (items.length) {
          chunks.push(
            items.splice(0, size)
          )
        }
      
        return chunks
      }

    const slidify = (data, itemW) => {
        let result;

        const containerW = containRef.current.clientWidth;

        const theABC = data.split('-');
        const slideSize = Math.trunc(containerW/parseInt(itemW));

        result = chunkArray(theABC, slideSize);
        setSlides(result);
    }

    // Get 'width' after the initial render
    useEffect(() => {
        slidify(alphabet, itemWidth);
        window.addEventListener("resize", () => {
          slidify(alphabet, itemWidth)
        });
    }, []);

  return(    
    <VStack>
    <Swiper className={cssContainer} ref={containRef}>
        {slides.map((slide) => <SwiperSlide>
            <HStack h='100%'>
                {slide.map((letter) => <Letter value={letter} />)}
            </HStack>
        </SwiperSlide>)}
    </Swiper>
    {(slides.length > 1 && !isAlertClosed) ?
        <Alert
            w={containRef.current.clientWidth} 
            justifyContent='center'
            className={cssAlert}
            onClick={() => setAlertClosed(true)}>

            <MdSwipe size='25px' />
            <AlertDescription>
                {t('view-alphabet-swipe-tip')}
            </AlertDescription>

        </Alert>
      : null
    }
    </VStack>
   )
}

export default AlphabetSlider;