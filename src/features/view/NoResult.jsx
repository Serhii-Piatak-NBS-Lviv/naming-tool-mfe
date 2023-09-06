import { useTranslation } from "react-i18next";
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import NoResultImage from "../../app/images/no-result.svg";

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setGender, setLetter } from '../filter/filterSlice';
import { loadAllPetnames, setNamesList } from './viewSlice';
import { toggleLoader } from '../../app/commonSlice';

export const NoResult = () => {

    const [cssNoResultWrapper] = useThemifiedComponent('no-result-wrapper');
    const [cssNoResultTitle] = useThemifiedComponent('no-result-title');
    const [cssNoResultDescription] = useThemifiedComponent('no-result-description');
    const [cssResetFilters] = useThemifiedComponent('reset-filters-button');

    const initialNamesList = useSelector(state => state.common.fetchedNamesList);
    const petNamesLoadMore = useSelector(state => state.view.petnames_portion);

    const dispatch = useDispatch(); 
    const { t } = useTranslation();   

    const resetFelters = () => {
        dispatch(toggleLoader());
        dispatch(setLetter(''));
        dispatch(setGender(t('filter gender both')));
        dispatch(setSelectedCategory(''));
        window.setTimeout(() => dispatch(toggleLoader()), 800);
        dispatch(loadAllPetnames(initialNamesList));
        dispatch(setNamesList(initialNamesList.slice(0, petNamesLoadMore)));
    }

    return (
        <div className={cssNoResultWrapper}>
            <img 
                src={NoResultImage} 
                alt={t('Empty search result title')} 
                style={{margin: ' 0 auto 26px', textAlign: 'center'}}
            />
            <h3 className={cssNoResultTitle}>
                {t('Empty search result title')}
            </h3>
            <p className={cssNoResultDescription}>
                {t('Empty search result description')}
            </p>
            <button 
                className={cssResetFilters}
                onClick={() => resetFelters()}
            >
                {t('Reset filters button')}
            </button>
        </div>
    )
}
