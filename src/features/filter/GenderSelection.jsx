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

  return (
    <div className={cssWrapper}>
      <p className={cssMainTitle}>{title}</p>
      <div style={{display: "flex"}}>
        {
          radios.map(titleInput => {
            return (
              <label className={cx(cssRadioLabel, isActive(titleInput, selectedGender))}
                key={titleInput}
              >
                <input 
                  style={{display: "none"}}
                  type="radio"
                  name={titleInput}
                  value={titleInput}
                  checked={selectedGender === titleInput}
                  onChange={() => handleRadio(titleInput)}
                />
                {titleInput}
              </label>
            )
          })
        }
      </div>
    </div>
  );
};

export default GenderSelection;