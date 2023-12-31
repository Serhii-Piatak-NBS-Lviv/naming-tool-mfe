import React, {useEffect, useRef} from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { getThemifiedResponsive } from '../../themes'; 

/**
* @author
* @function ThatItMessage
**/

const ThatItMessage = ({duration}) => {
    const theme = useSelector(state => state.common.theme);
    const [cssThatAllToast] = useThemifiedComponent('view-loadmore-thatsall', theme);
    const ref = useRef();

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
        That's all! You've seen all available results.
    </Box>
   )
  }

export default ThatItMessage;