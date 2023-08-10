import React, { useEffect } from "react";
import { injectGlobal } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { motion, useAnimate } from "framer-motion";
import { VStack, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import { setNamesList } from "./features/view/viewSlice";
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import ThatItMessage from "./features/view/ThatItMessage";
import { setTheme, setLocale } from "./app/commonSlice";
import { setPetnamesPortion } from "./features/view/viewSlice";

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import namesList from "./app/apisimul/view/names-list";
// **

const App = ({data}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const petNamesLoadMore = useSelector(state => state.view.petnames_portion);
  const curPortion = useSelector(state => state.view.names_list);
  const addPortionSize = useSelector(state => state.view.petnames_portion);
  const viewSize = useSelector(state => state.view.names_list_size);

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    const [scope, animate] = useAnimate();  
    const startAnimation = () => {
      animate(scope.current, { opacity: 1 }, { duration: 1.2 }, { ease: "linear" })
    };

    const loadMorePetNames = () => {
      //** Attention! This is paceholder! Please replace it when backend API will be ready! */
      dispatch(setNamesList(namesList.list.slice(0, curPortion.length + addPortionSize)));
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

      //** Attention! This is paceholder! Please remove it when backend API will be ready! */
      dispatch(setNamesList(namesList.list.slice(0, petNamesLoadMore)));
      // dispatch(setNamesList(namesList.list.slice(0, 1000)));
      // **
    }, [data, dispatch, i18n, petNamesLoadMore]);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);

  return (
    <VStack as={motion.div} className={cssAppContainer} ref={scope} initial={{opacity: 0}}>
      <Filter />
      <View />
      <Flex className={cssLoadmoreFlexbox}>
        {
          //** Attention! namesList is placeholder! Please remove it when backend API will be ready! */
          (viewSize === namesList.list.length) ? 
          <ThatItMessage duration = '2000' />
          :
          <Button className={cssLoadmoreButton} onClick={loadMorePetNames}>Load more</Button>
        }
      </Flex>
    </VStack>
  )
}

export default App;
