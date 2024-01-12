import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SimpleGrid } from '@chakra-ui/react';
import ShiftingPopover from './ShiftingPopover';

/**
* @author 
* @function View
**/

export const View = () => {

  const { t } = useTranslation();
  const simpleGridRef = useRef();
  const namesList = useSelector(state => state.view.names_list);
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const defineGridColumns = () => {
    switch (true) {
      case innerWidth < 600:
        return 1;
      case innerWidth < 900:
        return 2;
      case innerWidth < 1139:
        return 3;
      default:
        return 4;
    }
  };

  return(
    <SimpleGrid 
      ref={simpleGridRef} 
      position={'relative'} 
      spacing='16px' 
      w={'100%'} 
      mx="auto" 
      maxW={1109} 
      columns={defineGridColumns()}
    >
      { namesList.map((petname) => {
        return (
          <ShiftingPopover
          id={petname.id} 
          title={petname.title} 
          description={petname.definition}
          gender={petname.gender}
          categories={petname.categories}
          simpleGridRef={simpleGridRef}
          key={petname.id} />              
        )}
      )}
    </SimpleGrid>
  )
};

export default View;