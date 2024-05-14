import React, {useEffect, useRef} from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { getThemifiedResponsive } from '../../themes'; 
import { useTranslation } from 'react-i18next';

/**
* @author
* @function ThatItMessage
**/

const ThatItMessage = ({duration}) => {
    const theme = useSelector(state => state.common.theme);
    const [cssThatAllToast] = useThemifiedComponent('view-loadmore-thatsall', theme);
    const ref = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        const box = ref.current;
        const timeout = setTimeout(() => box.classList.add('hidden'), duration)
     
        return () => clearTimeout(timeout)
    }, []);

    return(
    <Box 
    ref={ref} 
    className={cssThatAllToast}
    w={getThemifiedResponsive(theme, 'view-loadmore-thatsall', 'width')}
    h={getThemifiedResponsive(theme, 'view-loadmore-thatsall', 'height')}
    >
        {t('end of names list')}
    </Box>
   )
  }

export default ThatItMessage;