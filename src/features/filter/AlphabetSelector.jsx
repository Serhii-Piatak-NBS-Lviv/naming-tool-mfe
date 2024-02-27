import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { cx, css } from '@emotion/css';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

/**
* @author
* @function 
**/

export const AlphabetSelector = ({handleLetter}) => {
  const filterState = useSelector(state => state.filter);
  const initialNamesList = useSelector(state => state.common.fetchedNamesList);
  const genderSelected = useSelector(state => state.filter.gender);

  const [cssAlphabeticalContainer] = useThemifiedComponent('filter-alphabetical-container');
  const [cssAlphabeticalList] = useThemifiedComponent('filter-alphabetical-list');
  const [cssAlphabeticalletter] = useThemifiedComponent('filter-alphabetical-letter');

  const { t } = useTranslation();
  const alphabet = t('alphabet').split('-');

  const cssMissedLetter = css`
    opacity: 0.4;
    pointer-events: none;
  `;

  const getHeadLetters = R.pipe(R.pluck('title'), R.map(petName => petName.charAt(0)), R.uniq);
  const selByGender = R.filter(petname => R.equals(petname.gender, filterState.gender));
  
  const selByCategory = R.when(
    () => filterState.selectedCategories.length > 0,
    R.filter(petname => petname.categories.includes(filterState.selectedCategories))
  );
  const getAvaiLetters = genderSelected ? R.pipe(selByGender, selByCategory, getHeadLetters) : R.pipe(selByCategory, getHeadLetters);
  const activeLetters = getAvaiLetters(initialNamesList);

  return(
    <div className={cssAlphabeticalContainer}>
      <ul className={cssAlphabeticalList}>
        {
          alphabet.map(letter => {
            return (        
              <li 
                className={cx(
                  {[cssAlphabeticalletter]: true},
                  {[cssMissedLetter]: !activeLetters.includes(letter)},
                  {['selected']: filterState.letter.includes(letter) && activeLetters.includes(letter)}
                )} 
                onClick={() => handleLetter(letter)}
                key={letter}
              >
                {letter}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
