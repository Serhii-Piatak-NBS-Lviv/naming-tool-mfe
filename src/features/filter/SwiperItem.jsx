import { useSelector } from 'react-redux';

import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

const CategoryItem = ({ title, icon, handleFilter }) => {
    const activeFilters = useSelector(state => state.filter.selectedCategories);

    const [cssCategoryWrapper] = useThemifiedComponent('filter-category');
    const [cssTitle] = useThemifiedComponent('filter-category-title');

    const isActive = (activeFilters, title) => {
        return activeFilters.includes(title)
            ? { border: '1px solid #E81C24' }
            : {}
    }

    return (
        <div
            style={isActive(activeFilters, title)}
            className={cssCategoryWrapper}
            onClick={() => handleFilter(title)}
        >
            <img src={require(`../../app/apisimul/filter/${icon}`)} alt={title} />
            <span className={cssTitle}>{title}</span>
        </div>
    )
}

export default CategoryItem;
