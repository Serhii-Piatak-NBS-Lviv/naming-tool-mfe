import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { useSelector } from 'react-redux';
import { cx, css } from '@emotion/css';

const SwiperCategoryItem = ({category, handleFilter}) => {
    const activeFilters = useSelector(state => state.filter.selectedCategories);

    const [cssCategoryWrapper] = useThemifiedComponent('filter-category');
    const [cssCategoryIsActive] = useThemifiedComponent('isActive');
    const [cssTitle] = useThemifiedComponent('filter-category-title');
    const [cssImage] = useThemifiedComponent('filter-category-image');

    const isActive = (activeFilters, id) => {
        if(activeFilters.includes(id)) return cssCategoryIsActive;
    }

    const setIconUrl = (category) => {
        const { icon_desktop_tablet, icon_mobile } = category;
        return (window.innerWidth > 768 ? icon_desktop_tablet : icon_mobile);
    };

    return (
        <div        
            className={cx(cssCategoryWrapper, isActive(activeFilters, category.id))}
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