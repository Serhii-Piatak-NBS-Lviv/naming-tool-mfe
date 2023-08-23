import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { cx } from '@emotion/css';

const SwiperCategoryItem = ({category, handleFilter, setIconUrl}) => {   

    const [cssCategoryWrapper] = useThemifiedComponent('filter-category');    
    const [cssTitle] = useThemifiedComponent('filter-category-title');
    const [cssImage] = useThemifiedComponent('filter-category-image');

    return (
        <div        
            className={cx(cssCategoryWrapper)}
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