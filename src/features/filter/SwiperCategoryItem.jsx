import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import datalayerEvent from '../../app/datalayer';

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

    const handleClick = (category) => {
        const DL_PAYLOAD = {
            user_pet_type: "Dog",
            form_technology: "React",
            filter_action: 'Filter click',
            filter_name: category.title
        };

        handleFilter(category.id);

        if (activeFilters === '') datalayerEvent("custom_event", "naming_tool_fiter_click", DL_PAYLOAD);
    }

    return (
        <div        
            className={cx(cssCategoryWrapper, isActive(activeFilters, category.id))}
            onClick={() => handleClick(category)}
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