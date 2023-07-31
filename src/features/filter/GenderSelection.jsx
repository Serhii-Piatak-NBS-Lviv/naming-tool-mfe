import { useDispatch, useSelector } from 'react-redux';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import { setGender } from './filterSlice';

const GenderSelection = ({ title, radios }) => {
  const dispatch = useDispatch();

  const [cssWrapper] = useThemifiedComponent('filter-gender-section');
  const [cssMainTitle] = useThemifiedComponent('filter-gender-section-title');
  const [cssRadioInput] = useThemifiedComponent('filter-gender-input');
  const [cssRadioLabel] = useThemifiedComponent('filter-gender-label');

  const selectedGender = useSelector((state) => state.filter.gender);

  const handleRadio = (radio) => {
    dispatch(setGender(radio));
  };

  console.log(selectedGender);

  return (
    <div className={cssWrapper}>
      <p className={cssMainTitle}>{title}</p>
      <div>
        {
          radios.map(titleInput => {
            return (
              <label className={cssRadioLabel}
                key={titleInput}
              >
                <input className={cssRadioInput}
                  type="radio"
                  name="titleInput"
                  value="titleInput"
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