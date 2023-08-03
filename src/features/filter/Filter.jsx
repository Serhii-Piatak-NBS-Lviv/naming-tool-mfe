import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import restAPI from '../../app/apisimul/filter/name-categories';

import FormFilters from './FormFilters';

/**
* @restAPI  - list of name categories will come from 
Drupal back-end. For first develop iteration static JSON
used from src/app/apisimul  folder
* @function Filter
* When Filter component being monted to the page, list
* of name categories should be fetched from backend, pushed
* to filterSlice part of Redux storage
**/

const Filter = () => {
    const [cssFiltersContainer] = useThemifiedComponent('filters');
    const [cssUnderlineOverriden] = useThemifiedComponent('filters-heading-underline');
    const [cssMainSubtitle] = useThemifiedComponent('filters-subtitle');
    
    const { t } = useTranslation();

    return (
        <div className={cssFiltersContainer} id="filters" >
            <div>
                <span className={cssUnderlineOverriden} />
                <p className={cssMainSubtitle}>
                    {t('filter subtitle - we compiled a list')}
                </p>
            </div>                
           <FormFilters
                title={t('filter slider title')}
                restAPI={restAPI}
            />                
        </div>
    )
};

export default Filter;