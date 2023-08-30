import React, {useState, useRef, useEffect } from 'react';
import { CloseIcon } from '@chakra-ui/icons'
import { css } from '@emotion/css';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
    GridItem, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    Text, 
    Icon, 
    createIcon, 
    HStack, 
    Tooltip 
} from '@chakra-ui/react';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { useToast } from '@chakra-ui/react';
import { AiFillTwitterCircle } from "react-icons/ai";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { selectPetName } from './viewSlice';
import { getThemifiedResponsive } from '../../themes';

import useURLParam from '../../app/hooks/useURLParam';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

//** Attention! This is paceholder! Please remove it when backend API will be ready! */
import restAPI from '../../app/apisimul/filter/name-categories';
// **

/**
* @author
* @function ShiftingPopover
**/

const spanWrapp = css`
    display: flex;
    padding-top: 2px;
`;

const LinkIcon = createIcon({
    displayName: 'LinkIcon',
    viewBox: '0 0 24 24',
    path: (
      <path
        fill='currentColor'
        stroke='#FFF'
        d='M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM15.1105 8.39127C14.4936 8.51718 13.7985 8.8411 13.1397 9.36139C13.2491 9.44316 13.3536 9.53482 13.4522 9.63691C14.2283 10.4406 14.3453 11.5844 14.0891 12.6488C13.986 13.0773 13.8197 13.5114 13.5961 13.9372C14.2273 13.7125 14.9032 13.3019 15.5194 12.7068C16.3053 11.9479 16.7947 11.0816 16.977 10.3241C17.1618 9.55642 17.0156 9.01192 16.7194 8.70524C16.4232 8.39856 15.8842 8.23338 15.1105 8.39127ZM11.6364 8.68586C11.594 8.72685 11.5521 8.7682 11.5109 8.8099C11.1647 8.79297 10.8111 8.82446 10.4643 8.89522C9.38126 9.11625 8.24952 9.73308 7.29018 10.6595C6.33083 11.5859 5.67488 12.6955 5.41619 13.7701C5.15997 14.8345 5.27705 15.9784 6.05315 16.7821C6.82924 17.5857 7.96831 17.7427 9.041 17.5237C10.124 17.3027 11.2558 16.6859 12.2151 15.7595C12.2576 15.7185 12.2994 15.6771 12.3407 15.6354C12.6868 15.6523 13.0405 15.6209 13.3873 15.5501C14.4703 15.3291 15.602 14.7122 16.5614 13.7858C17.5207 12.8594 18.1767 11.7498 18.4354 10.6752C18.6916 9.61077 18.5745 8.46692 17.7984 7.66325C17.0223 6.85959 15.8833 6.70265 14.8106 6.92157C13.7275 7.1426 12.5958 7.75943 11.6364 8.68586ZM8.74106 16.054C9.35801 15.9281 10.0531 15.6042 10.7119 15.0839C10.6024 15.0022 10.498 14.9105 10.3994 14.8084C9.6233 14.0047 9.50622 12.8609 9.76244 11.7965C9.86559 11.368 10.0319 10.9339 10.2554 10.5081C9.6243 10.7328 8.94841 11.1434 8.33216 11.7385C7.54629 12.4974 7.05685 13.3638 6.87453 14.1212C6.68973 14.8889 6.836 15.4334 7.13216 15.7401C7.42832 16.0468 7.96738 16.2119 8.74106 16.054ZM11.4784 13.7664C11.5624 13.8534 11.666 13.929 11.7889 13.9891C12.2201 13.4218 12.502 12.8326 12.6308 12.2978C12.8156 11.5301 12.6693 10.9856 12.3732 10.6789C12.2891 10.5919 12.1856 10.5163 12.0627 10.4562C11.6314 11.0235 11.3495 11.6127 11.2208 12.1475C11.036 12.9152 11.1822 13.4597 11.4784 13.7664Z'
      />
    ),
});

const WhatsappIcon = createIcon({
    displayName: 'WhatsappIcon',
    viewBox: '0 0 32 32',
    path: (
      <path
        fill='currentColor'
        stroke='#FFF'
        d='M2.5 16C2.5 8.26801 8.76801 2 16.5 2C24.232 2 30.5 8.26801 30.5 16C30.5 23.732 24.232 30 16.5 30C8.76801 30 2.5 23.732 2.5 16ZM13.117 22.5991C14.2746 23.2213 15.5686 23.5461 16.8828 23.5442C18.6338 23.544 20.3359 22.9669 21.7259 21.9021C23.1159 20.8374 24.1164 19.3442 24.5725 17.6537C25.0287 15.9632 24.9151 14.1695 24.2494 12.55C23.5836 10.9306 22.4028 9.57557 20.8896 8.69464C19.3764 7.8137 17.615 7.4559 15.878 7.67659C14.141 7.89728 12.5251 8.68416 11.2803 9.91551C10.0354 11.1469 9.23099 12.7541 8.99138 14.4886C8.75177 16.2231 9.09034 17.9882 9.95473 19.5109L8.88203 23.6562L13.117 22.5991ZM15.2509 17.6481C17.2771 19.3821 19.2005 19.6076 20.1217 19.1755C21.0428 18.7437 21.0482 17.6119 20.9695 17.4109C20.8909 17.2098 19.0772 16.4267 18.9068 16.5984C18.7365 16.7701 18.1582 17.563 18.1582 17.563C18.1582 17.563 17.4614 17.7015 16.1588 16.5868C14.8563 15.472 14.8855 14.7622 14.8855 14.7622C14.8855 14.7622 15.5792 14.0684 15.7228 13.8735C15.8664 13.6786 14.8125 12.0078 14.6017 11.9611C14.391 11.9145 13.2737 12.0949 12.9893 13.0718C12.7049 14.0486 13.2247 15.9141 15.2509 17.6481Z'
      />
    ),
});

const FacebookIcon = createIcon({
    displayName: 'WhatsappIcon',
    viewBox: '0 0 32 32',
    path: (
      <path
        fill='currentColor'
        stroke='#FFF'
        d='M16.5 2C8.76792 2 2.5 8.26792 2.5 16C2.5 23.7321 8.76792 30 16.5 30C24.2321 30 30.5 23.7321 30.5 16C30.5 8.26792 24.2321 2 16.5 2ZM19.8162 11.6746H17.7119C17.4625 11.6746 17.1854 12.0027 17.1854 12.4387V13.9583H19.8177L19.4196 16.1254H17.1854V22.631H14.7019V16.1254H12.4487V13.9583H14.7019V12.6837C14.7019 10.855 15.9706 9.36896 17.7119 9.36896H19.8162V11.6746Z'
      />
    ),
});

const ShareLink = ({ petnameId, children }) => {
    const toast = useToast();
    const browserURL = new URL(window.location.href);
    const itmLink = `${browserURL.href}?petname=${petnameId}`;
    // const itmLink = `${browserURL.protocol}//${browserURL.host}?petname=${petnameId}`;
    return (
        <CopyToClipboard text={itmLink} onCopy={
            () => toast({
                title: 'Share link copied to clipboard.',
                description: itmLink,
                variant: 'left-accent',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        }>
            <span>
                { children }
            </span>
        </CopyToClipboard>
    )
};

const shareButtonLink = (petnameId) => {
    const browserURL = new URL(window.location.href);
    const itemLink = `${browserURL.href}?petname=${petnameId}`;
    
    return itemLink;
}

const SplashDescription = ({id, title, description, theme, gender, categories, simpleGridRef, gridItemRef}) => {
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
    const [cssShareIcon] = useThemifiedComponent('view-shareicon', theme);
    const [cssCloseButton] = useThemifiedComponent('view-namedescription__close', theme);
    const [cssCardArrow] = useThemifiedComponent('view-namedescription__arrow', theme);

    useEffect(() => {
        function setCardPlacement() {
            setCardPosition({
                arrowPosition: gridItemRef.current ? (gridItemRef.current.offsetLeft + (gridItemRef.current.offsetWidth / 2) - 10) : null,
                toLeft: gridItemRef.current.offsetLeft || null
            });
            setWidth(simpleGridRef.current.offsetWidth);
        };
        window.addEventListener("resize", () => setCardPlacement());
        setCardPlacement();
        gridItemRef.current?.scrollIntoView({behavior: "smooth"});
      }, [gridItemRef, simpleGridRef]);

    const closePopup = () => {
        const urlWithoutQuery = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutQuery);
        dispatch(selectPetName(''));
    };

    const enumCategories = (idsArray) => {
        const ctgList = idsArray.reduce((acc, itm) => {
            let ctgTitle = restAPI.list.find(category => category.id === itm).title;
            if (ctgTitle) acc += `, ${ctgTitle}`;
            return acc;
        }, []);

        return ctgList;
    };

    const defineHeight = (el) => {
        if(el) {
            setTimeout(() => {
                console.log(el.offsetHeight )
            }, 300)
        }
        
        
        // return !!cardRef.current ? '700px' : 0
    }

  return(
    <Card
        className={cssCardWrapper}
        as={motion.div}
        initial={{ opacity: 0, height: 'fit-content', transform: 'translateY(50px)' }}
        animate={{
            opacity: !!cardRef.current ? 1 : 0,
            height: defineHeight(cardRef.current),
            transform: 'translateY(0px)',
            transition: { opacity: { delay: .1 } },
        }}    
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}        
        ref={cardRef}
        w={width}
        p={getThemifiedResponsive(theme, 'view-cardwrapper', 'padding')}
        right={ cardPosition.toLeft ? `${cardPosition.toLeft}px` : ''}
    >
        <span 
            className={cssCardArrow}
            style={{left: `${cardPosition.arrowPosition ? cardPosition.arrowPosition : 0}px`}}
        />
        <Button position='absolute' right={getThemifiedResponsive(theme, 'view-namedescription__close', 'right')} top={getThemifiedResponsive(theme, 'view-namedescription__close', 'top')} w='24px' h='24px' className={cssCloseButton} onClick={() => closePopup()}>
            <Tooltip hasArrow label='Close'><CloseIcon/></Tooltip>
        </Button>
        <CardHeader p={getThemifiedResponsive(theme, 'view-cardheading', 'padding')}>
            <Heading fontSize={getThemifiedResponsive(theme, 'view-nametitle', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-nametitle', 'lineHeight')} className={cssPetNameTitle}>{title}</Heading>
            <Heading className={cssPetNameSubitle} fontSize={getThemifiedResponsive(theme, 'view-namesubtitle', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-namesubtitle', 'lineHeight')} my='16px'>
                <strong className={cssPetNameSubitleStrong}>Categories: </strong>{gender}{enumCategories(categories)}
            </Heading>
        </CardHeader>
        <CardBody maxW={getThemifiedResponsive(theme, 'view-namedescription', 'maxWidth')} p={getThemifiedResponsive(theme, 'view-cardbody', 'padding')} className={cssPetNameCard}>
            <Text className={cssPetNameText} fontSize={getThemifiedResponsive(theme, 'view-namedescription__text', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-namedescription__text', 'lineHeight')} >{description}</Text>
        </CardBody>
        <CardFooter as={HStack} p={getThemifiedResponsive(theme, 'view-cardfooter', 'padding')}>
            
            <ShareLink petnameId={id}>
                <Tooltip hasArrow label='Copy link'>
                    <Icon as={LinkIcon} className={cssShareIcon} fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} />
                </Tooltip>
            </ShareLink>

            <TwitterShareButton  url={shareButtonLink(id)}>
               <Tooltip hasArrow label='Twitter'>
                <span className={spanWrapp}>
                    <Icon as={AiFillTwitterCircle} className={cssShareIcon} fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} />
                </span>
                </Tooltip> 
            </TwitterShareButton>

            <WhatsappShareButton url={shareButtonLink(id)}>
                <Tooltip hasArrow label='WhatsApp'>
                    <Icon as={WhatsappIcon} className={cssShareIcon} fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} />
                </Tooltip>  
            </WhatsappShareButton>
            
            <FacebookShareButton url={shareButtonLink(id)}>
                <Tooltip hasArrow label='Facebook'>
                    <Icon as={FacebookIcon} className={cssShareIcon} fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} />
                </Tooltip>
            </FacebookShareButton>
            
        </CardFooter>
    </Card>
   )
}

const ShiftingPopover = ({id, title, description, gender, categories, simpleGridRef}) => {
    const dispatch = useDispatch();
    
    const gridItemRef = useRef();
    const isInvokedAsParam = useURLParam('petname', id);

    if (isInvokedAsParam) dispatch(selectPetName(id));

    const selectedPetName = useSelector((state) => state.view.selected_name);
    const isOpen = (selectedPetName === id);  
    
    const theme = useSelector((state) => state.common.theme);
    const [cssPetNameButton] = useThemifiedComponent('view-name-button', theme);

    const namesList = useSelector((state) => state.view.names_list);
    const prevPortion = useSelector((state) => state.view.names_list_prevsize);
    
    const reveal = () => {
        const browserURL = new URL(window.location.href);        
        if (browserURL.searchParams.get('petname')) {
            window.history.replaceState(null, document.title, "/");
        };
        isOpen ? dispatch(selectPetName('')) : dispatch(selectPetName(id));

        // scroll to open card name
        if (gridItemRef.current) {
            setTimeout(() => {
                gridItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                });
            }, 300)            
        }
    };

    // This useEffect performes scrolling when
    // next portion of pet names shows up
    useEffect(() => {
        const idxElem = namesList.findIndex(name => name.id === id);
        if (idxElem !== 0 && idxElem === prevPortion) gridItemRef.current?.scrollIntoView({behavior: "smooth"});
    }, [])

  return(
    <GridItem px='2%'>
        <Button 
            className={cssPetNameButton}
            ref={gridItemRef}
            size='lg' 
            w={'100%'} 
            maxW={getThemifiedResponsive(theme, 'view-name-button', 'maxWidth')}
            m='0' 
            onClick={reveal}> 
            {title} 
        </Button>
        { isOpen && <SplashDescription 
            id={id} 
            title={title} 
            description={description}
            theme={theme}
            gender={gender}
            categories={categories}
            simpleGridRef={simpleGridRef}
            gridItemRef={gridItemRef}/> }
    </GridItem>
   )
}

export default ShiftingPopover;