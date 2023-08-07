import React, { useState, useEffect } from "react";
import { injectGlobal } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { motion, useAnimate } from "framer-motion";

import { VStack, Box, Flex, Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";
import { setNamesList } from "./features/view/viewSlice";
import restAPI from './app/apisimul/filter/name-categories';
import Filter from "./features/filter/Filter";
import View from "./features/view/View";
import { setTheme, setLocale } from "./app/commonSlice";

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import namesList from "./app/apisimul/view/names-list";
// **

const App = ({data}) => {

  const findGender = (g) => {
    if(g === "M") {
      return "Male"
    } else if(g === "F") {
      return 'Female'
    } else {
      return g;
    }
  }

  const newArray = namesList.list.map(elem => {
    const categories = [
        elem["Most Popular"] === "Y" ? 'category-001' : null,
        elem["Drinks"] === "Y" ? 'category-002' : null,
        elem["Unusual"] === "Y" ? 'category-003' : null,
        elem["Cartoon"] === "Y" ? 'category-004' : null,
        elem["Musical"] === "Y" ? 'category-005' : null,
        elem["Space & Science"] === "Y" ? 'category-006' : null,
        elem["Greek"] === "Y" ? 'category-007' : null,
        elem["Disney"] === "Y" ? 'category-008' : null,
        elem["Regal"] === "Y" ? 'category-009' : null,
        elem["Natural"] === "Y" ? 'category-010' : null,
        elem["Literary"] === "Y" ? 'category-011' : null,
        elem["Magical and Mythical"] === "Y" ? 'category-012' : null,
        elem["Foodie"] === "Y" ? 'category-013' : null,
        elem["Optimistic"] === "Y" ? 'category-014' : null,
        elem["Spain"] === "Y" ? 'category-015' : null,
        elem["Scottish"] === "Y" ? 'category-016' : null,
        elem["Small"] === "Y" ? 'category-017' : null,
        elem["Large"] === "Y" ? 'category-018' : null,
        elem["Short"] === "Y" ? 'category-019' : null,
        elem["Celebrities"] === "Y" ? 'category-020' : null,
        elem["Germany"] === "Y" ? 'category-021' : null,
        elem["Chinese"] === "Y" ? 'category-022' : null,
        elem["French"] === "Y" ? 'category-023' : null,
        elem["Italy"] === "Y" ? 'category-024' : null,
    ].filter(category => category !== null);

    const obj = {
        "id": elem.id,
        "Title": elem.Title,
        "Definition": elem.Definition,
        "Gender": findGender(elem.Gender),
        "categories": categories,
    };

    return obj;
});

  console.log(newArray);






  

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  let fl = data.hasOwnProperty('theme') ? fontsLoader(data.theme) : null;
    if (fl) injectGlobal`${fl}`;

    const [scope, animate] = useAnimate();  
    const startAnimation = () => {
      animate(scope.current, { opacity: 1 }, { duration: 1.2 }, { ease: "linear" })
    }

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


      //** Attention! This is paceholder! Please remove it when backend API will be ready! */
      dispatch(setNamesList(namesList.list.slice(0, 32)));
      // **
    }, []);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
    const [cssLoadmoreButton] = useThemifiedComponent('view-loadmore-button', data.theme);
    const [cssLoadmoreFlexbox] = useThemifiedComponent('view-loadmore-flex', data.theme);
  
  return (
    <VStack as={motion.div} className={cssAppContainer} ref={scope} initial={{opacity: 0}}>
      <Filter />
      <View />
      <Flex className={cssLoadmoreFlexbox}>
        <Button className={cssLoadmoreButton}>Load more</Button>
      </Flex>
    </VStack>
  )
}

export default App;
