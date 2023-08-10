import { useTranslation } from "react-i18next";
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import NoResultImage from "../../app/images/no-result.svg";

export const NoResult = () => {

    const [cssNoResultWrapper] = useThemifiedComponent('no-result-wrapper');
    const [cssNoResultTitle] = useThemifiedComponent('no-result-title');
    const [cssNoResultDescription] = useThemifiedComponent('no-result-description');
    const { t } = useTranslation();   

    return (
        <div className={cssNoResultWrapper}>
            <img 
                src={NoResultImage} 
                alt={t('Empty search result title')} 
                style={{margin: ' 0 auto 26px', textAlign: 'center'}}
            />
            <h3 className={cssNoResultTitle}>
                {t('Empty search result title')}
            </h3>
            <p className={cssNoResultDescription}>
                {t('Empty search result description')}
            </p>
        </div>
    )
}
