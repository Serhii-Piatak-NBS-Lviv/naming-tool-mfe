import React, { useEffect } from "react";
import { injectGlobal, css } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { motion, useAnimate } from "framer-motion";
import { VStack, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import * as R from 'ramda';
import useFetch from "react-fetch-hook";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import ThatItMessage from "./features/view/ThatItMessage";

import { setTheme, setLocale, initializeNamesList, initializeCategoriesList, toggleLoadMoreBtn, toggleLoader } from "./app/commonSlice";
import { setNamesList, setPetnamesPortion, loadAllPetnames } from "./features/view/viewSlice";
import { setGender } from "./features/filter/filterSlice";

import LoadingOverlay from 'react-loading-overlay-ts';
import FadeLoader from "react-spinners/FadeLoader";

import { NoResult } from "./features/view/NoResult";

const App = ({data}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const petNamesLoadMore = useSelector(state => state.view.petnames_portion);
  const curPortion = useSelector(state => state.view.names_list);
  const addPortionSize = useSelector(state => state.view.petnames_portion);
  const viewSize = useSelector(state => state.view.names_list_size);
  const namesFullList = useSelector(state => state.view.names_list_full);
  const isLoadMoreAvail = useSelector(state => state.common.showLoadMore);
  const ctgURL = useSelector(state => state.common.categoriesOrigin);
  const nameURL = useSelector(state => state.common.namesOrigin);

  const categories = useFetch(ctgURL);
  const petnames = useFetch(nameURL);

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    const [scope, animate] = useAnimate();  
    const startAnimation = () => {
      animate(scope.current, { opacity: 1 }, { duration: 1.2 }, { ease: "linear" })
    };       

    const loadMorePetNames = () => {
      dispatch(setNamesList(namesFullList.slice(0, curPortion.length + addPortionSize)));
      if (isLoadMoreAvail && (viewSize === namesFullList.length)) dispatch(toggleLoadMoreBtn());
    };

    //push categories and petnames to Redux storage
    useEffect(() => {
      let namesFullList, initialGender; //instead of namesToInitialize

      const browserURL = new URL(window.location.href);

      if (categories.error) console.log(categories.error);
      if (petnames.error) console.log(petnames.error);
      if (categories.data) dispatch(initializeCategoriesList(categories.data));
      if (petnames.data) {
        if (browserURL.searchParams.get('petname')) {
          const elemIndex = petnames.data.findIndex(petname => petname.id === browserURL.searchParams.get('petname'));
          const newFirstElem = petnames.data[elemIndex];
          initialGender = newFirstElem.gender;
          namesFullList = [
            newFirstElem,
            ...petnames.data.slice(0, elemIndex)
          ];

          if (elemIndex <= petnames.data.length - 1) {
            namesFullList = [...namesFullList, ...petnames.data.slice(elemIndex + 1)];
          };
        } else {
          namesFullList = [...petnames.data];
          initialGender = "Both";
        };
        namesFullList.forEach((petname) => petname.categories = R.pluck('target_id', petname.categories));
        dispatch(initializeNamesList(namesFullList));
        dispatch(setGender(initialGender));
        const namesToLoad = namesFullList.filter((petname) => petname.gender === initialGender);
        dispatch(loadAllPetnames(namesToLoad));
        dispatch(setNamesList(namesToLoad.slice(0, petNamesLoadMore)));
      };
      if(!categories.isLoading && !petnames.isLoading) dispatch(toggleLoader());
      // console.log(categories.data);
      // console.log(petnames.data);
    }, [categories, petnames, petNamesLoadMore, dispatch])

    // other inputs except of categories and petnames
    useEffect(() => {
      if (themes[data.theme]["google-fonts"].length) {
        WebFont.load({
          google: {
            families: themes[data.theme]["google-fonts"]
          }
        });

        startAnimation();
      };

      if (data.locale) i18n.changeLanguage(data.locale);
      
      // push Theme and Locale into Redux storage:
      if (data.hasOwnProperty('theme')) dispatch(setTheme(data.theme));
      if (data.hasOwnProperty('locale')) dispatch(setLocale(data.locale));

      // push pet names view portion size depending on 
      // Desktop/Mobile into Redux storage:
      isMobile ? dispatch(setPetnamesPortion(16)) : dispatch(setPetnamesPortion(32));
      
    }, [data, dispatch, i18n, startAnimation]);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);
    
    const isDesktop = scope.current?.offsetWidth >= 1120 ? true : false;

    const cssOverlay = css`
      & ._loading_overlay_overlay {
        background-color: rgba(230, 230, 230, 0.7);
      };
      & ._loading_overlay_overlay ._loading_overlay_content {
        left: 45vw;
        position: fixed;
        color: rgba(232, 28, 36, 1);
        font-size: 32px;
        font-weight: 600;
        
        @media(min-width: 0px) {
          left: 14vw;
        };

        @media(min-width: 320px) {
          left: 20vw;
        };

        @media(min-width: 360px) {
          left: 25vw;
        };

        @media(min-width: 420px) {
          left: 30vw;
        };

        @media(min-width: 586px) {
          left: 36vw;
        };

        @media(min-width: 840px) {
          left: 40vw;
        };

        @media(min-width: 1120px) {
          left: 45%;
        };
      }
    `;

  return (
    <LoadingOverlay
      active={useSelector(state => state.common.showLoader)}
      spinner={<FadeLoader height='14px' width='14px' radius='16px' margin='10px' color='rgba(232, 28, 36, 1)' speedMultiplier={3} cssOverride={{"left": '95px'}}/>}
      text={t('loading text')}
      styles={{
        content: {
          position: 'absolute',
          top: '45vh',
        }
      }}
      className={cssOverlay}
    >
    <VStack as={motion.div} className={cssAppContainer} ref={scope} initial={{opacity: 0}}>
      <Filter />
      {
        (viewSize === 0) ? 
        <NoResult />
        :
        <>
          <View />
          <Flex className={cssLoadmoreFlexbox}>
            {
              !isLoadMoreAvail ?
              <ThatItMessage duration = '2000' />
              :
              <Button className={`${cssLoadmoreButton} ${isDesktop ? 'desktop' : null}`} onClick={loadMorePetNames}>{t('load more button')}</Button>
            }
          </Flex>
        </>
      }
    </VStack>
    </LoadingOverlay>
  )
}

export default App;
