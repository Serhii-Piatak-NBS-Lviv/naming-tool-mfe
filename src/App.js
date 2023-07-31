import React, { useState, useEffect } from "react";
import { injectGlobal } from '@emotion/css';
import WebFont from 'webfontloader';
import { useTranslation } from "react-i18next";
import { VStack } from "@chakra-ui/react";

import { fontsLoader, themes } from './themes';
import useThemifiedComponent from "./app/hooks/useThemifiedComponent";

const App = ({data}) => {
  const { t, i18n } = useTranslation();

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
      
    }, []);

    const [cssAppContainer] = useThemifiedComponent('app-container', data.theme);
  // ToDo ------- Replace it by your code

  //  Counter is a state initialized to 0
  // const [counter, setCounter] = useState(0);

  // const [cssCounterContainer] = useThemifiedComponent('counter-container', data.theme);
  // const [cssCounterTitle] = useThemifiedComponent('counter-title', data.theme);
  // const [cssCounterValue] = useThemifiedComponent('counter-value', data.theme);
  // const [cssControlBox] = useThemifiedComponent('control-box', data.theme);
  // const [cssBtnIncrease] = useThemifiedComponent('increase-button', data.theme);
  // const [cssBtnDecrease] = useThemifiedComponent('decrease-button', data.theme);
  // const [cssStaticString] = useThemifiedComponent('static-string', data.theme);
  
  // Function is called everytime increment button is clicked
  // const handleClick1 = () => {
  //   // Counter state is incremented
  //   setCounter(counter + 1)
  // }
  
  // Function is called everytime decrement button is clicked
  // const handleClick2 = () => {
  //   // Counter state is decremented
  //   setCounter(counter - 1)
  // }
  // ToDo end---------------------------------
  
  return (
    <VStack className = {cssAppContainer} minH = '200px'></VStack>
  )
}

export default App;
