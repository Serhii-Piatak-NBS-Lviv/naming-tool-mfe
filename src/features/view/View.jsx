import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

    return(
        <SimpleGrid 
          ref={simpleGridRef} 
          position={'relative'} 
          minChildWidth='255px' 
          spacing='16px' 
          w={'100%'} 
          mx="auto" maxW={1109}>
            { namesList.map((petname) => {
            return (
              <ShiftingPopover              
                id={petname.id} 
                title={petname.Title} 
                description={petname.Definition}
                gender={petname.Gender}
                categories={petname.categories}
                simpleGridRef={simpleGridRef}
                key={petname.id} />              
            )}
          ) }
        </SimpleGrid>
    )
};

export default View;