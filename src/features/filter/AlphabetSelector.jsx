import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { cx, css } from '@emotion/css';
import { useSelector } from 'react-redux';

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

  const isActive = (activeFilters, title) => {
    if(activeFilters.includes(title) && activeFilter.includes(title)) return cssLetterActive;
  }

  const missedLetter = css`
    opacity: 0.4;
    pointer-events: none;
  `

  const checkLetter = (letter) => {
    const isActive = activeFilter.includes(letter);
    return !isActive ? missedLetter : null 
  }

  const activeFilter = Array.from(new Set([...namesList.list.map(el => {
    return {
      letter: el.Title[0],
      gender: el.Gender,
      categories: el.categories
    }
  }).filter(elem => elem.gender === filterState.gender)
    .filter(element => filterState.selectedCategories.length === 0 ? element : element.categories.includes(filterState.selectedCategories))
    .map(obj => obj.letter)]));

  return(
    <div className={cssAlphabeticalContainer}>
      <ul className={cssAlphabeticalList}>
        {
          alphabet.map(letter => {
            return (        
              <li 
                className={cx(cssAlphabeticalletter, isActive(filterState.letter, letter), checkLetter(letter))} 
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
