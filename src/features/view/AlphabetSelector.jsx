import React from 'react';
import { useTranslation } from 'react-i18next';

/**
* @author
* @function 
**/

export const AlphabetSelector = () => {
    const { t } = useTranslation();
    const alphabet = t('alphabet').split('-');
    console.log(alphabet)

  return(
    <></>
   )
  }
