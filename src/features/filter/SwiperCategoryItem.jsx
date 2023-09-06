import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { useSelector } from 'react-redux';
import { cx, css } from '@emotion/css';

const SwiperCategoryItem = ({category, handleFilter}) => {
    const activeFilters = useSelector(state => state.filter.selectedCategories);    
    const namesList = useSelector(state => state.view.names_list_full);

    const [cssCategoryWrapper] = useThemifiedComponent('filter-category');
    const [cssCategoryIsActive] = useThemifiedComponent('isActive');
    const [cssTitle] = useThemifiedComponent('filter-category-title');
    const [cssImage] = useThemifiedComponent('filter-category-image');

    const isActive = (activeFilters, id) => {
        if(activeFilters.includes(id)) return cssCategoryIsActive;
    }

    const setIconUrl = (category) => {
        const device = window.innerWidth > 768 ? 'desktop_tablet' : 'mobile';
        const { icon_desktop_tablet, icon_mobile } = category;

        return require(`../../app/images/${device}/${window.innerWidth > 768 ? icon_desktop_tablet : icon_mobile}`);
    };

    const missedCategory = css`
        opacity: 0.4;
        pointer-events: none;
    `

    const activeCategories = Array.from(new Set([...namesList
        .map(categories => categories.categories)
        .filter(arr => arr.length > 0)
        .reduce((flat, item) => {
            return flat.concat(Array.isArray(item) ? item : [item]);
        }, [])]));    

    const checkCategory = (category) => {
        const isActive = activeCategories.includes(category);
        return !isActive ? missedCategory : null 
    }

    return (
        <div        
            className={cx(cssCategoryWrapper, isActive(activeFilters, category.id), checkCategory(category.id))}
            onClick={() => handleFilter(category.id)}
        >
            <img 
                className={cssImage}
                src={setIconUrl(category)} 
                alt={category.title} 
            />
            <span className={cssTitle}>
                {category.title}
            </span>
        </div>
    )
}

export default SwiperCategoryItem;