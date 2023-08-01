import React, {useState, useRef, useEffect } from 'react';
import { CloseIcon } from '@chakra-ui/icons'
import { css } from '@emotion/css';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Button, GridItem, Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { selectPetName } from './viewSlice';
import useURLParam from '../../app/hooks/useURLParam';

import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

/**
* @author
* @function ShiftingPopover
**/

const arrow = css`
    position: absolute;
    height: 20px;
    width: 20px;
    top: -11px;
    border-left: solid 1px red;
    border-top: solid 1px red;
    background: #fff;
    transform: rotate(45deg);
`;

const SplashDescription = ({id, title, description, theme, simpleGridRef, gridItemRef}) => {
    const toast = useToast();
    const cardRef = useRef();  
    const dispatch = useDispatch();
    
    const [cardPosition, setCardPosition] = useState({toLeft: null, arrowPosition: null});
    const [width, setWidth] = useState(null);

    const [cssCardWrapper] = useThemifiedComponent('view-cardwrapper', theme);
    const [cssPetNameTitle] = useThemifiedComponent('view-nametitle', theme);
    const [cssPetNameSubitle] = useThemifiedComponent('view-namesubtitle', theme);
    const [cssPetNameSubitleStrong] = useThemifiedComponent('view-namesubtitle__strong', theme);
    const [cssPetNameCard] = useThemifiedComponent('view-namedescription', theme);
    const [cssPetNameText] = useThemifiedComponent('view-namedescription__text', theme);

    useEffect(() => {
        function setCardPlacement() {
            setCardPosition({
                arrowPosition: gridItemRef.current ? (gridItemRef.current.offsetLeft + (gridItemRef.current.offsetWidth / 2) - 10) : null,
                toLeft: gridItemRef.current.offsetLeft - 10 || null
            });
            setWidth(simpleGridRef.current.offsetWidth);
        };
        window.addEventListener("resize", () => setCardPlacement());
        setCardPlacement();
      }, [gridItemRef, simpleGridRef]);
    
    const handleShare = () => {
        const browserURL = new URL(window.location.href);
        const itmLink = `${browserURL.protocol}//${browserURL.host}?petname=${id}`;
        navigator.clipboard.writeText(itmLink);
        toast({
            title: 'Share link copied to clipboard.',
            description: itmLink,
            variant: 'left-accent',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
    }; 

    const closePopup = () => {
        const urlWithoutQuery = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutQuery);
        dispatch(selectPetName(''));
    }

  return(
    <Card
        className={cssCardWrapper}
        as={motion.div}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}        
        ref={cardRef}
        w={width}
        mt='22px'
        right={ cardPosition.toLeft ? `${cardPosition.toLeft}px` : ''}
    >
        <span 
            className={arrow}
            style={{left: `${cardPosition.arrowPosition ? cardPosition.arrowPosition : 0}px`}}
        />
        <Button position='absolute' right='20px' top='20px' onClick={() => closePopup()}>
            <CloseIcon/>
        </Button>
        <CardHeader>
            <Heading size='3xl' className={cssPetNameTitle}>{title}</Heading>
            <Heading className={cssPetNameSubitle} my='16px'>
                <strong className={cssPetNameSubitleStrong}>Categories: </strong>Female, Famous, Funny
            </Heading>
        </CardHeader>
        <CardBody maxW='70%' py='24px' className={cssPetNameCard}>
            <Text className={cssPetNameText}>{description}</Text>
        </CardBody>
        <CardFooter>
            <Button onClick={handleShare}> Share link</Button>
        </CardFooter>
    </Card>
   )
}

const ShiftingPopover = ({id, title, description, simpleGridRef}) => {
    const dispatch = useDispatch();
    
    const gridItemRef = useRef();
    const isInvokedAsParam = useURLParam('petname', id);

    if (isInvokedAsParam) dispatch(selectPetName(id));

    const selectedPetName = useSelector((state) => state.view.selected_name);
    const isOpen = (selectedPetName === id);  
    
    const theme = useSelector((state) => state.common.theme);
    const [cssPetNameButton] = useThemifiedComponent('view-name-button', theme);

    
    const reveal = () => {
        const browserURL = new URL(window.location.href);
        if (browserURL.searchParams.get('petname')) {
            window.history.replaceState(null, document.title, "/");
        };
        isOpen ? dispatch(selectPetName('')) : dispatch(selectPetName(id));
    };

  return(
    <GridItem px='2%'>
        <Button 
            className={cssPetNameButton}
            ref={gridItemRef}
            size='lg' w={'100%'} 
            m='0' 
            onClick={reveal}> 
            {title} 
        </Button>
        { isOpen && <SplashDescription 
            id={id} 
            title={title} 
            description={description}
            theme={theme}
            simpleGridRef={simpleGridRef}
            gridItemRef={gridItemRef}/> }
    </GridItem>
   )
}

export default ShiftingPopover;