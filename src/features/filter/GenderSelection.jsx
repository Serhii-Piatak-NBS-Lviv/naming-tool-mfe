import { cx } from '@emotion/css';
import { useSelector } from 'react-redux';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

const GenderSelection = ({ title, radios, handleRadio }) => {
  const [cssWrapper] = useThemifiedComponent('filter-gender-section');
  const [cssMainTitle] = useThemifiedComponent('filter-gender-section-title'); 
  const [cssRadioLabel] = useThemifiedComponent('filter-gender-label');
  const [cssRadioActive] = useThemifiedComponent('filter-gender-input-active');

  const selectedGender = useSelector((state) => state.filter.gender);  

  const isActive = (checkboxTitle, selectedGender) => {
    return checkboxTitle === selectedGender
      ? cssRadioActive
      : '';
  }

  // Logic of choosing initial gender was moved to App.js

  return (
    <div className={cssWrapper}>
      <p className={cssMainTitle}>{title}</p>
      <div style={{display: "flex"}}>
        {
          radios.map(titleInput => {
            return (
              <label className={cx(cssRadioLabel, isActive(titleInput[1], selectedGender))}
                key={titleInput[1]}
              >
                <input 
                  style={{display: "none"}}
                  type="radio"
                  name={titleInput[0]}
                  value={titleInput[1]}
                  checked={selectedGender === titleInput[1]}
                  onChange={() => handleRadio(titleInput[1])}
                />
                {titleInput[0]}
              </label>
            )
          })
        }
      </div>
    </div>
  );
};

export default GenderSelection;