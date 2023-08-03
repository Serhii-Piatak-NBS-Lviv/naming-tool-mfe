import React, { useState, useEffect } from "react";
import { injectGlobal } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";

import { VStack, Box, Flex, Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import { setNamesList } from "./features/view/viewSlice";
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import { setTheme, setLocale } from "./app/commonSlice";

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import namesList from "./app/apisimul/view/names-list";
// **

const App = ({data}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    useEffect(() => {
      if (themes[data.theme]["google-fonts"].length) {
        WebFont.load({
          google: {
            families: themes[data.theme]["google-fonts"]
          }
        });
      };

      if (data.locale) i18n.changeLanguage(data.locale);
      
      // push Theme and Locale into Redux storage:
      if (data.hasOwnProperty('theme')) dispatch(setTheme(data.theme));
      if (data.hasOwnProperty('locale')) dispatch(setLocale(data.locale));


      //** Attention! This is paceholder! Please remove it when backend API will be ready! */
      dispatch(setNamesList(namesList.list.slice(0, 32)));
      // **
    }, []);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);
  
  return (
    <VStack className = {cssAppContainer} minH = '200px'>
      <Filter />
      <View />
      <Flex className={cssLoadmoreFlexbox}>
        <Button className={cssLoadmoreButton}>Load more</Button>
      </Flex>
    </VStack>
  )
}

export default App;
