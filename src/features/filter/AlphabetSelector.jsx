import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { cx, css } from '@emotion/css';
import { useSelector } from 'react-redux';

/**
* @author
* @function 
**/

export const AlphabetSelector = ({handleLetter}) => {
  const activeLetter = useSelector(state => state.filter.letter);
  const namesList = useSelector(state => state.view.names_list_full);

  const [cssAlphabeticalContainer] = useThemifiedComponent('filter-alphabetical-container');
  const [cssAlphabeticalList] = useThemifiedComponent('filter-alphabetical-list');
  const [cssAlphabeticalletter] = useThemifiedComponent('filter-alphabetical-letter');
  const [cssLetterActive] = useThemifiedComponent('filter-alphabetical-letter-active');

  const { t } = useTranslation();
  const alphabet = t('alphabet').split('-');

  const isActive = (activeFilters, title) => {
    if(activeFilters.includes(title) && activeLetters.includes(title)) return cssLetterActive;
  }

  const missedLetter = css`
    opacity: 0.4;
    pointer-events: none;
  `

  const checkLetter = (letter) => {
    const isActive = activeLetters.includes(letter);
    return !isActive ? missedLetter : null 
  }

  const activeLetters = Array.from(new Set([...namesList
    .map(element => element.Title[0])
    .filter(element => element !== " ")]));  

  return(
    <div className={cssAlphabeticalContainer}>
      <ul className={cssAlphabeticalList}>
        {
          alphabet.map(letter => {
            return (        
              <li 
                className={cx(cssAlphabeticalletter, isActive(activeLetter, letter), checkLetter(letter))} 
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
