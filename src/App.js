import React, { useEffect } from "react";
import { injectGlobal, css } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { motion, useAnimate } from "framer-motion";
import { VStack, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import ThatItMessage from "./features/view/ThatItMessage";

import { setTheme, setLocale, initializeNamesList, toggleLoadMoreBtn } from "./app/commonSlice";
import { setNamesList, setPetnamesPortion, loadAllPetnames } from "./features/view/viewSlice";
import { setGender } from "./features/filter/filterSlice";

import LoadingOverlay from 'react-loading-overlay-ts';
import RingLoader from "react-spinners/RingLoader";

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import namesList from "./app/apisimul/view/names-list";
import { NoResult } from "./features/view/NoResult";
// **

const App = ({data}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const petNamesLoadMore = useSelector(state => state.view.petnames_portion);
  const curPortion = useSelector(state => state.view.names_list);
  const addPortionSize = useSelector(state => state.view.petnames_portion);
  const viewSize = useSelector(state => state.view.names_list_size);
  const namesFullList = useSelector(state => state.view.names_list_full);
  const isLoadMoreAvail = useSelector(state => state.common.showLoadMore);

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    const [scope, animate] = useAnimate();  
    const startAnimation = () => {
      animate(scope.current, { opacity: 1 }, { duration: 1.2 }, { ease: "linear" })
    };       

    const loadMorePetNames = () => {
      //** Attention! This is paceholder! Please replace namesList when backend API will be ready! */
      dispatch(setNamesList(namesFullList.slice(0, curPortion.length + addPortionSize)));
      if (isLoadMoreAvail && (viewSize === namesFullList.length)) dispatch(toggleLoadMoreBtn());
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

      // push initial pet names full list to Redux storage
      // ToDo: replace namesList.list placeholder by actual data fetched from REST
      const namesToInitialize = loadNameLists(namesList.list);
      const namesToLoad = namesToInitialize.initialNamelist.filter((petname) => petname.Gender === namesToInitialize.initialGender);
      dispatch(initializeNamesList(namesToInitialize.initialNamelist));
      dispatch(loadAllPetnames(namesToLoad));
      dispatch(setNamesList(namesToLoad.slice(0, petNamesLoadMore)));
      
    }, [data, dispatch, i18n, petNamesLoadMore]);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);
    
    const isDesktop = scope.current?.offsetWidth >= 1120 ? true : false;

    const cssOverlay = css`
     & ._loading_overlay_overlay {
      background-color: rgba(58,53,51,0.3);

      * {
        user-select: none;
      }
     }
      & ._loading_overlay_overlay ._loading_overlay_content {
        left: 45vw;
        position: fixed;
        
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
      spinner={<img src={require('./app/images/loading-red.png')} alt="loader" style={{margin: '20px auto'}} />}
      text='Refreshing pet names list...'
      styles={{
        content: {
          position: 'absolute',
          top: '45vh'
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
              <Button className={`${cssLoadmoreButton} ${isDesktop ? 'desktop' : null}`} onClick={loadMorePetNames}>Load more</Button>
            }
          </Flex>
        </>
      }
    </VStack>
    </LoadingOverlay>
  )
}

export default App;
