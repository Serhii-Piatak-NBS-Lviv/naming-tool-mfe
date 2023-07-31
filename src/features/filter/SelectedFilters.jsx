import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

const SelectedFilters = ({ handleFilter }) => {
    const activeFilters = useSelector(state => state.filter.selectedCategories);
    const [animationParent] = useAutoAnimate();

    const [cssSelectedFilters] = useThemifiedComponent('selected-filters-wrapper');
    const [cssSelectedItem] = useThemifiedComponent('selected-filters-item');

    return (
        <div className={cssSelectedFilters}
            ref={animationParent}
        >

            {
                activeFilters.map((item) => {
                    return (
                        <span className={cssSelectedItem}
                            onClick={() => handleFilter(item)}
                            key={item}
                        >
                            {item}
                        </span>
                    )
                })
            }

        </div>
    )
}

export default SelectedFilters;
