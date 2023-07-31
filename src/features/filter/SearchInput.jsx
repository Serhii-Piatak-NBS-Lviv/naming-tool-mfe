import { useDispatch, useSelector } from 'react-redux';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { setSpecificName } from './filterSlice';

const SearchInput = ({ title, placeholder }) => {
  const dispatch = useDispatch();
  console.log(useSelector(state => state.filter.specificName));

  const [cssWrapper] = useThemifiedComponent('filter-searchInput-wrapper');
  const [cssInputTitle] = useThemifiedComponent('filter-input-title');
  const [cssInputContainer] = useThemifiedComponent('filter-input-container');
  const [cssInput] = useThemifiedComponent('filter-input-search');

  return (
    <div className={cssWrapper}>
      <p className={cssInputTitle}>
        {title}
      </p>
      <div className={cssInputContainer}>
        <input className={cssInput}
          type="text"
          placeholder={placeholder}
          onChange={(e) => dispatch(setSpecificName(e.target.value))}
        />
      </div>
    </div>
  )
}

export default SearchInput;
