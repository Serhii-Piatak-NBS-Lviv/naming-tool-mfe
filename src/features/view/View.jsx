import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SimpleGrid } from '@chakra-ui/react';
import ShiftingPopover from './ShiftingPopover';
import { reduce } from 'ramda';


/**
* @author 
* @function View
**/

export const View = () => {
    const { t } = useTranslation();
    const simpleGridRef = useRef();
    const namesList = useSelector(state => state.view.names_list);

    return(
        <SimpleGrid ref={simpleGridRef} position={'relative'} minChildWidth='255px' spacing='16px' w={'100%'} mx="auto" maxW={1109}>
            { namesList.map((petname) => {
              const ctgArr = petname.categories.reduce((acc, ctg) => {
                if (ctg.target_id) acc.push(ctg.target_id);
                return acc;
              }, [])
            return (
              <ShiftingPopover
              id={petname.id} 
              title={petname.title} 
              description={petname.definition}
              gender={petname.gender}
              categories={ctgArr}
              simpleGridRef={simpleGridRef}
              key={petname.id} />              
            )}
          ) }
        </SimpleGrid>
    )
};

export default View;