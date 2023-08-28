import React, { useState, useEffect } from "react";
import { injectGlobal, css } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { motion, useAnimate } from "framer-motion";
import { VStack, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Headroom from "react-headroom";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import ThatItMessage from "./features/view/ThatItMessage";

import { setTheme, setLocale, initializeNamesList } from "./app/commonSlice";
import { setNamesList, setPetnamesPortion, loadAllPetnames } from "./features/view/viewSlice";
import { setGender } from "./features/filter/filterSlice";

import LoadingOverlay from 'react-loading-overlay-ts';
import RingLoader from "react-spinners/RingLoader";

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import namesList from "./app/apisimul/view/names-list";
import { NoResult } from "./features/view/NoResult";
// **

// import './App.css';

const App = ({data}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const petNamesLoadMore = useSelector(state => state.view.petnames_portion);
  const curPortion = useSelector(state => state.view.names_list);
  const addPortionSize = useSelector(state => state.view.petnames_portion);
  const viewSize = useSelector(state => state.view.names_list_size);
  const namesFullList = useSelector(state => state.view.names_list_full);

  const cssStickyFilter = css`
    & .headroom--pinned {
      top: -40px !important;
    }
  `;

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    const [scope, animate] = useAnimate();  
    const startAnimation = () => {
      animate(scope.current, { opacity: 1 }, { duration: 1.2 }, { ease: "linear" })
    };   

    const loadMorePetNames = () => {
      //** Attention! This is paceholder! Please replace namesList when backend API will be ready! */
      dispatch(setNamesList(namesFullList.slice(0, curPortion.length + addPortionSize)));
    };

    const loadNameLists = (fetchedNames) => {
      const browserURL = new URL(window.location.href);

      if (browserURL.searchParams.get('petname')) {
        // If page was opened via share link then re-organize
        // array of pet names in a way where requested pet name is
        // on first place
        const elemIndex = fetchedNames.findIndex(petname => petname.id === browserURL.searchParams.get('petname'));
        const newFirstElem = fetchedNames[elemIndex];
        let newFullList = [
          newFirstElem,
          ...fetchedNames.slice(0, elemIndex)
        ];

        if (elemIndex <= fetchedNames.length - 1) {
          newFullList = [...newFullList, ...fetchedNames.slice(elemIndex + 1)];
        };

        // To keep user experience consistent, in case
        // when we open Names Tool via share link
        // we should select gender in accordance to 
        // shared pet name:
        dispatch(setGender(fetchedNames[elemIndex]["Gender"]));
        return {
          'initialNamelist': newFullList,
          'initialGender': fetchedNames[elemIndex]["Gender"]
        };
      };
      dispatch(setGender("Both"));
      return {
        'initialNamelist': fetchedNames,
        'initialGender': "Both"
      };
    };

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

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // push initial pet names full list to Redux storage
      // ToDo: replace namesList.list placeholder by actual data fetched from REST
      const namesToInitialize = loadNameLists(namesList.list);
      const namesToLoad = namesToInitialize.initialNamelist.filter((petname) => petname.Gender === namesToInitialize.initialGender);
      dispatch(initializeNamesList(namesToInitialize.initialNamelist));
      dispatch(loadAllPetnames(namesToLoad));
      dispatch(setNamesList(namesToLoad.slice(0, petNamesLoadMore)));
      
    }, [data, dispatch, i18n, petNamesLoadMore, windowWidth]);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);

  return (
    <LoadingOverlay
      active={useSelector(state => state.common.showLoader)}
      spinner={<RingLoader size='100px' color='#FFF' cssOverride={{"left": '50px'}}/>}
      text='Refreshing pet names list...'
      styles={{
        content: {
          position: 'absolute',
          left: '45%',
          top: '25%'
        }
      }}
    >
    <VStack  
      as={motion.div} 
      className={cssAppContainer} 
      ref={scope} 
      initial={{opacity: 0}}>
        {
          window.innerWidth > 991 
          ? <Filter />
          : <Headroom className={cssStickyFilter} >
              <Filter />
            </Headroom>          
        }     
      {
        (viewSize === 0) ? 
        <NoResult />
        :
        <>
          <View />
          <Flex className={cssLoadmoreFlexbox}>
            {
              //** Attention! namesList is placeholder! Please remove it when backend API will be ready! */
              (viewSize === namesFullList.length) ? 
              <ThatItMessage duration = '2000' />
              :
              <Button className={cssLoadmoreButton} onClick={loadMorePetNames}>Load more</Button>
            }
          </Flex>
        </>
      }
    </VStack>
    </LoadingOverlay>
  )
}

export default App;
