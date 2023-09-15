import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { cx, css } from '@emotion/css';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import namesList from "../../app/apisimul/view/names-list";

/**
* @author
* @function 
**/

export const AlphabetSelector = ({handleLetter}) => {
  const filterState = useSelector(state => state.filter);

  const [cssAlphabeticalContainer] = useThemifiedComponent('filter-alphabetical-container');
  const [cssAlphabeticalList] = useThemifiedComponent('filter-alphabetical-list');
  const [cssAlphabeticalletter] = useThemifiedComponent('filter-alphabetical-letter');
  const [cssLetterActive] = useThemifiedComponent('filter-alphabetical-letter-active');

  const { t } = useTranslation();
  const alphabet = t('alphabet').split('-');

  const cssMissedLetter = css`
    opacity: 0.4;
    pointer-events: none;
  `;

  const getHeadLetters = R.pipe(R.pluck('Title'), R.map(petName => petName.charAt(0)), R.uniq);
  const selByGender = R.filter(petname => R.equals(petname.Gender, filterState.gender));
  const selByCategory = R.when(
    () => filterState.selectedCategories.length > 0,
    R.filter(petname => petname.categories.includes(filterState.selectedCategories))
  );
  const getAvaiLetters = R.pipe(selByGender, selByCategory, getHeadLetters);
  const activeLetters = getAvaiLetters(namesList.list);

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
                  {[cssLetterActive]: filterState.letter.includes(letter) && activeLetters.includes(letter)}
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
