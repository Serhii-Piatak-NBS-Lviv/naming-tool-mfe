import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
const SectionHeader = ({ title, subTitle }) => {

    const [cssMainTitle] = useThemifiedComponent('filters-title');
    const [cssUnderlineOverriden] = useThemifiedComponent('filters-heading-underline');
    const [cssMainSubtitle] = useThemifiedComponent('filters-subtitle');

    return (
        <>
            <h2 className={cssMainTitle}>
                {title}
            </h2>
            <span className={cssUnderlineOverriden} />
            <p className={cssMainSubtitle}>
                {subTitle}
            </p>
        </>
    )
}

export default SectionHeader;
