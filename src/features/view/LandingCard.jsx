import { Card, CardHeader, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import React from 'react'

/**
* @author
* @function 
**/

const LandingCard = () => {
    const { t } = useTranslation();

  return(
    <Card direction='row'>
        <CardHeader className='view-hero-title'>
            {t("view hero landing title")}
        </CardHeader>
        <Image
            objectFit='cover'
            src={require('../../app/apisimul/view/hero-puppy.png')}
            alt='Naming Tool Hero Image'
        />
    </Card>
   )
};

export default LandingCard;
