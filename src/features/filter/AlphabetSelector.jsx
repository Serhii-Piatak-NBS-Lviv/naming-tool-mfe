import { useTranslation } from 'react-i18next';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { cx } from '@emotion/css';
import { useSelector } from 'react-redux';

/**
* @author
* @function 
**/

export const AlphabetSelector = ({handleLetter}) => {
  const activeLetter = useSelector(state => state.filter.letter);

  const [cssAlphabeticalContainer] = useThemifiedComponent('filter-alphabetical-container');
  const [cssAlphabeticalList] = useThemifiedComponent('filter-alphabetical-list');
  const [cssAlphabeticalletter] = useThemifiedComponent('filter-alphabetical-letter');
  const [cssLetterActive] = useThemifiedComponent('filter-alphabetical-letter-active');

  const { t } = useTranslation();
  const alphabet = t('alphabet').split('-');

  const isActive = (activeFilters, title) => {
    if(activeFilters.includes(title)) return cssLetterActive;
  }

  return(
    <div className={cssAlphabeticalContainer}>
      <ul className={cssAlphabeticalList}>
        {
          alphabet.map(letter => {
            return (        
              <li 
                className={cx(cssAlphabeticalletter, isActive(activeLetter, letter))} 
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
