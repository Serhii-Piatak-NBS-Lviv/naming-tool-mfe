import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useThemify from '../../app/hooks/useThemify';
import { cx } from '@emotion/css';

import LandingCard from './LandingCard';
import AlphabetSlider from './AlphabetSlider';
import NameSwiper from './NameSwiper';
import { ResultsCard } from './ResultsCard';


/**
* @author 
* @function View
**/

export const View = () => {
    const { t } = useTranslation();
    const [defaultTheme, overrideTheme, isThemeOverriden] = useThemify('view');
    const [dftThmTopTitle, ovrdThmTopTitle, isThmTopTitleOvrd] = useThemify('view-top-title');

    return(
        <div className={cx(
            { [defaultTheme]: true },
            { [overrideTheme]: isThemeOverriden }
        )} id='view'>
            <h2 className={cx(
            { [dftThmTopTitle]: true },
            { [ovrdThmTopTitle]: isThmTopTitleOvrd }
            )} id="view-top-title">
                {t('view section title')}
            </h2>
            <AlphabetSlider alphabet={t('alphabet')} />
            {/* <LandingCard /> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NameSwiper />
                <ResultsCard />
            </div>
        </div>
    )
};

export default View;