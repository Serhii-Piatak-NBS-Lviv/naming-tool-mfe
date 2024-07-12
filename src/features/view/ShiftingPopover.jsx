import React, {useState, useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import { CloseIcon } from '@chakra-ui/icons'
import { useTranslation } from "react-i18next";
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
    VStack, 
    Tooltip 
} from '@chakra-ui/react';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
// import { useToast } from '@chakra-ui/react';
import { AiFillTwitterCircle } from "react-icons/ai";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { selectPetName, setLastNameRef } from './viewSlice';
import { getThemifiedResponsive } from '../../themes';

import useURLParam from '../../app/hooks/useURLParam';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

import CustomizedTooltip from './CustomizedTooltip';
import { T } from 'ramda';
import md5 from 'md5';
import datalayerEvent from '../../app/datalayer';

/**
* @author
* @function ShiftingPopover
**/

// Following two constants describing the height of navbar in Drupal
// so that the button with the puppy's name does not "run behind" the navbar
const TOP_NAVBAR_DESKTOP = 126;
const TOP_NAVBAR_MOBILE = 10;

// this constant describes the breakpoint where the desktop screen starts
const SCREENWIDTH_DESKTOP = 1139;

const spanWrapp = css`
    display: flex;
    padding-top: 2px;
`;



const LinkIcon = createIcon({
    displayName: 'LinkIcon',
    viewBox: '0 0 32 32',
    path: (
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 30C24.232 30 30.5 23.732 30.5 16C30.5 8.26801 24.232 2 16.5 2C8.76801 2 2.5 8.26801 2.5 16C2.5 23.732 8.76801 30 16.5 30ZM20.4637 11.4077C19.6785 11.568 18.7939 11.9802 17.9554 12.6424C18.0947 12.7465 18.2276 12.8632 18.3531 12.9931C19.3409 14.0159 19.4899 15.4718 19.1638 16.8264C19.0325 17.3718 18.8208 17.9243 18.5364 18.4662C19.3396 18.1802 20.1998 17.6576 20.9841 16.9002C21.9844 15.9343 22.6073 14.8317 22.8393 13.8677C23.0745 12.8907 22.8884 12.1977 22.5114 11.8073C22.1345 11.417 21.4484 11.2068 20.4637 11.4077ZM16.0422 11.7827C15.9882 11.8348 15.9349 11.8875 15.8824 11.9405C15.4419 11.919 14.9917 11.9591 14.5504 12.0491C13.172 12.3304 11.7316 13.1155 10.5106 14.2946C9.28961 15.4737 8.45476 16.8858 8.12551 18.2536C7.79942 19.6083 7.94844 21.0641 8.93619 22.0869C9.92394 23.1098 11.3737 23.3095 12.7389 23.0309C14.1173 22.7496 15.5577 21.9645 16.7787 20.7854C16.8327 20.7333 16.886 20.6806 16.9385 20.6276C17.379 20.6491 17.8292 20.609 18.2705 20.519C19.6489 20.2377 21.0893 19.4526 22.3103 18.2735C23.5313 17.0944 24.3661 15.6823 24.6954 14.3145C25.0215 12.9598 24.8725 11.504 23.8847 10.4812C22.897 9.45832 21.4472 9.25858 20.082 9.5372C18.7036 9.81851 17.2632 10.6036 16.0422 11.7827ZM12.3572 21.1604C13.1424 21.0001 14.027 20.5878 14.8655 19.9257C14.7262 19.8216 14.5933 19.7049 14.4678 19.575C13.48 18.5521 13.331 17.0963 13.6571 15.7416C13.7884 15.1963 14.0001 14.6438 14.2845 14.1019C13.4813 14.3879 12.6211 14.9105 11.8368 15.6679C10.8366 16.6338 10.2136 17.7364 9.98159 18.7004C9.74639 19.6774 9.93254 20.3704 10.3095 20.7608C10.6864 21.1511 11.3725 21.3613 12.3572 21.1604ZM15.8411 18.2488C15.948 18.3595 16.0798 18.4558 16.2362 18.5322C16.7851 17.8102 17.1439 17.0604 17.3077 16.3797C17.5429 15.4026 17.3568 14.7096 16.9798 14.3193C16.8729 14.2085 16.7411 14.1123 16.5847 14.0359C16.0358 14.7579 15.677 15.5077 15.5132 16.1884C15.278 17.1655 15.4641 17.8585 15.8411 18.2488Z" fill="#E81C24"/>
    ),
});

const WhatsappIcon = createIcon({
    displayName: 'WhatsappIcon',
    viewBox: '0 0 32 32',
    path: (
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 16C2.5 8.26801 8.76801 2 16.5 2C24.232 2 30.5 8.26801 30.5 16C30.5 23.732 24.232 30 16.5 30C8.76801 30 2.5 23.732 2.5 16ZM13.117 22.5991C14.2746 23.2213 15.5686 23.5461 16.8828 23.5442C18.6338 23.544 20.3359 22.9669 21.7259 21.9021C23.1159 20.8374 24.1164 19.3442 24.5725 17.6537C25.0287 15.9632 24.9151 14.1695 24.2494 12.55C23.5836 10.9306 22.4028 9.57557 20.8896 8.69464C19.3764 7.8137 17.615 7.4559 15.878 7.67659C14.141 7.89728 12.5251 8.68416 11.2803 9.91551C10.0354 11.1469 9.23099 12.7541 8.99138 14.4886C8.75177 16.2231 9.09034 17.9882 9.95473 19.5109L8.88203 23.6562L13.117 22.5991ZM15.2509 17.6481C17.2771 19.3821 19.2005 19.6076 20.1217 19.1755C21.0428 18.7437 21.0482 17.6119 20.9695 17.4109C20.8909 17.2098 19.0772 16.4267 18.9068 16.5984C18.7365 16.7701 18.1582 17.563 18.1582 17.563C18.1582 17.563 17.4614 17.7015 16.1588 16.5868C14.8563 15.472 14.8855 14.7622 14.8855 14.7622C14.8855 14.7622 15.5792 14.0684 15.7228 13.8735C15.8664 13.6786 14.8125 12.0078 14.6017 11.9611C14.391 11.9145 13.2737 12.0949 12.9893 13.0718C12.7049 14.0486 13.2247 15.9141 15.2509 17.6481Z" fill="#E81C24"/>
        
    ),
});

const FacebookIcon = createIcon({
    displayName: 'FacebookIcon',
    viewBox: '0 0 32 32',
    path: (
        <path d="M16.5 2C8.76792 2 2.5 8.26792 2.5 16C2.5 23.7321 8.76792 30 16.5 30C24.2321 30 30.5 23.7321 30.5 16C30.5 8.26792 24.2321 2 16.5 2ZM19.8162 11.6746H17.7119C17.4625 11.6746 17.1854 12.0027 17.1854 12.4387V13.9583H19.8177L19.4196 16.1254H17.1854V22.631H14.7019V16.1254H12.4487V13.9583H14.7019V12.6837C14.7019 10.855 15.9706 9.36896 17.7119 9.36896H19.8162V11.6746Z" fill="#E81C24"/>
    ),
});

const TwitterIcon = createIcon({
    displayName: 'TwitterIcon',
    viewBox: '0 0 32 32',
    path: (
        <path d="M16.5 2C8.76875 2 2.5 8.26875 2.5 16C2.5 23.7313 8.76875 30 16.5 30C24.2313 30 30.5 23.7313 30.5 16C30.5 8.26875 24.2313 2 16.5 2ZM23.2281 12.5531C23.2375 12.7 23.2375 12.8531 23.2375 13.0031C23.2375 17.5906 19.7437 22.875 13.3594 22.875C11.3906 22.875 9.56562 22.3031 8.02812 21.3188C8.30937 21.35 8.57813 21.3625 8.86563 21.3625C10.4906 21.3625 11.9844 20.8125 13.175 19.8813C11.65 19.85 10.3687 18.85 9.93125 17.475C10.4656 17.5531 10.9469 17.5531 11.4969 17.4125C10.7116 17.253 10.0059 16.8265 9.49943 16.2056C8.99299 15.5846 8.71715 14.8075 8.71875 14.0063V13.9625C9.17812 14.2219 9.71875 14.3812 10.2844 14.4031C9.80888 14.0862 9.41893 13.6569 9.1491 13.1532C8.87926 12.6495 8.73789 12.087 8.7375 11.5156C8.7375 10.8687 8.90625 10.2781 9.20938 9.76562C10.0809 10.8386 11.1685 11.7161 12.4015 12.3411C13.6344 12.9662 14.985 13.3249 16.3656 13.3938C15.875 11.0344 17.6375 9.125 19.7563 9.125C20.7563 9.125 21.6562 9.54375 22.2906 10.2188C23.075 10.0719 23.825 9.77812 24.4937 9.38437C24.2344 10.1875 23.6906 10.8656 22.9688 11.2937C23.6688 11.2188 24.3438 11.025 24.9688 10.7531C24.4969 11.4469 23.9062 12.0625 23.2281 12.5531Z" fill="#E81C24"/>
    ),
});

// this helper calculates Y-position which to scroll
// so that the button with the puppy's name does not "run behind" the Drupal navbar
const getVerticalOffset = (elementRef) => {
    const toTop = window.innerWidth > SCREENWIDTH_DESKTOP ? TOP_NAVBAR_DESKTOP : TOP_NAVBAR_MOBILE;
    const rect = elementRef.getBoundingClientRect();
    return window.scrollY + rect.top - toTop;
};

const ShareLink = ({ petnameId, children }) => {
    // const toast = useToast();
    const browserURL = new URL(window.location.href);
    const itmLink = `${browserURL.href}?petname=${petnameId}`;
    return (
        <CopyToClipboard text={itmLink} onCopy={
            () => {}
            // Chackra UI toast can be shown as alternative
            // () => toast({
            //     title: 'Link copied!',
            //     duration: 2000,
            //     isClosable: true,
            //   })
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
    const shaRef = useRef();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    const [cardPosition, setCardPosition] = useState({toLeft: null, arrowPosition: null});
    const [width, setWidth] = useState(null);

    const [linkShared, setLinkShared] = useState(false);
    const [twitterShared, setTwitterShared] = useState(false);
    const [whatsappShared, setWhatsappShared] = useState(false);
    const [fbShared, setFbShared] = useState(false);

    const ctgStorage = useSelector(state => state.common.fetchedCategoriesList);

    const [cssCardWrapper] = useThemifiedComponent('view-cardwrapper', theme);
    const [cssPetNameTitle] = useThemifiedComponent('view-nametitle', theme);
    const [cssPetNameSubtitle] = useThemifiedComponent('view-namesubtitle', theme);
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
                toLeft: gridItemRef.current ? gridItemRef.current.offsetLeft : null
            });
            setWidth(simpleGridRef.current.offsetWidth);
        };
        window.addEventListener("resize", () => setCardPlacement());
        setCardPlacement();

        // scroll to open card name
        window.scrollTo({
            top: getVerticalOffset(gridItemRef.current),
            behavior: 'smooth',
        });
        
      }, [gridItemRef, simpleGridRef]);

    const closePopup = () => {
        const urlWithoutQuery = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutQuery);
        dispatch(selectPetName(''));
        gridItemRef.current.classList.remove('clicked');
    };

    const enumCategories = (idsArray) => {
        const ctgList = idsArray.reduce((acc, itm) => {
            let ctgTitle = ctgStorage.find(category => category.id === itm).title;
            if (ctgTitle) acc.push(ctgTitle);
            return acc;
        }, []);

        return ctgList.join(', ');
    };

    const defineCategoryTranslation = (idsArray) => {
        if(!idsArray.length) return ''; 

        return idsArray.length > 1 
            ? `${ t('category plural')}: `
            : `${ t('category singular')}: `
    }

    const handleShare = (callbck, socNet) => {
        const DL_PAYLOAD = {
            user_pet_type: "Dog",
            social_network: socNet,
            share_name: md5(`M4nzHg4MjVv6${title}`)
        };

        datalayerEvent("custom_event", "naming_tool_social_share", DL_PAYLOAD);

        callbck(true);
        setTimeout(() => {
            callbck(false);
        }, 1500);
    };

  return(
    <Card
        className={cssCardWrapper}
        as={motion.div}
        initial={{ opacity: 0, height: 'fit-content', transform: 'translateY(50px)' }}
        animate={{
            opacity: !!cardRef.current ? 1 : 0,
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
        <CardHeader p='0'>
            <Heading fontSize={getThemifiedResponsive(theme, 'view-nametitle', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-nametitle', 'lineHeight')} className={cssPetNameTitle}>{title}</Heading>
            <Heading className={cssPetNameSubtitle} fontSize={getThemifiedResponsive(theme, 'view-namesubtitle', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-namesubtitle', 'lineHeight')} my='16px'>
                <strong className={cssPetNameSubitleStrong}>{defineCategoryTranslation(categories)}</strong>{enumCategories(categories)}
            </Heading>
        </CardHeader>
        <CardBody maxW={getThemifiedResponsive(theme, 'view-namedescription', 'maxWidth')} p={getThemifiedResponsive(theme, 'view-cardbody', 'padding')} className={cssPetNameCard}>
            <Text className={cssPetNameText} fontSize={getThemifiedResponsive(theme, 'view-namedescription__text', 'fontSize')} lineHeight={getThemifiedResponsive(theme, 'view-namedescription__text', 'lineHeight')} >{parse(description)}</Text>
        </CardBody>
        <CardFooter as={HStack} p={getThemifiedResponsive(theme, 'view-cardfooter', 'padding')}>
            
            <VStack ref={shaRef}>
                <ShareLink petnameId={id}>
                    <Tooltip hasArrow label='Copy link'>
                        <Icon 
                        as={LinkIcon} 
                        className={cssShareIcon} 
                        fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} 
                        onClick={() => handleShare(setLinkShared, 'URL sharing')}
                        />
                    </Tooltip>
                </ShareLink>
                <CustomizedTooltip parentRef={shaRef.current} isShow={linkShared}/>
            </VStack>
            
            <VStack ref={shaRef}>
                <TwitterShareButton  url={shareButtonLink(id)}>
                    <Tooltip hasArrow label='Twitter'>
                        <span className={spanWrapp}>
                            <Icon 
                            as={TwitterIcon} 
                            className={cssShareIcon} 
                            fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')}
                            onClick={() => handleShare(setTwitterShared, 'Twitter (X)')}
                            />
                        </span>
                    </Tooltip> 
                </TwitterShareButton>
                <CustomizedTooltip parentRef={shaRef.current} isShow={twitterShared}/>
            </VStack>
            
            <VStack ref={shaRef}>
                <WhatsappShareButton url={shareButtonLink(id)}>
                    <Tooltip hasArrow label='WhatsApp'>
                        <Icon 
                        as={WhatsappIcon} 
                        className={cssShareIcon} 
                        fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} 
                        onClick={() => handleShare(setWhatsappShared, 'WhatsApp')}
                        />
                    </Tooltip>  
                </WhatsappShareButton>
                <CustomizedTooltip parentRef={shaRef.current} isShow={whatsappShared}/>
            </VStack>
            
            <VStack ref={shaRef}>
                <FacebookShareButton url={shareButtonLink(id)}>
                    <Tooltip hasArrow label='Facebook'>
                        <Icon 
                        as={FacebookIcon} 
                        className={cssShareIcon} 
                        fontSize={getThemifiedResponsive(theme, 'view-shareicon', 'fontSize')} 
                        onClick={() => handleShare(setFbShared, 'Facebook')}
                        />
                    </Tooltip>              
                </FacebookShareButton>
                <CustomizedTooltip parentRef={shaRef.current} isShow={fbShared}/>
            </VStack>
            
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
    const selectedLetter = useSelector((state) => state.filter.letter);

    const isOpen = (selectedPetName === id);  
    
    const theme = useSelector((state) => state.common.theme);
    const [cssPetNameButton] = useThemifiedComponent('view-name-button', theme);
    
    const isDesktop = simpleGridRef.current?.offsetWidth >= 1109 ? true : false;
  
    const reveal = () => {
        const browserURL = new URL(window.location.href);
        
        const DL_PAYLOAD = {
            user_pet_type: "Dog",
            form_technology: "React",
            alphabet_click: selectedLetter === '' ? 'undefined' : selectedLetter,
            pet_name: md5(`M4nzHg4MjVv6${title}`)
        };
        
        if (browserURL.searchParams.get('petname')) {
            window.history.replaceState(null, document.title, "/");
        };
        isOpen ? dispatch(selectPetName('')) : dispatch(selectPetName(id));

        // scroll to open card name
        if (gridItemRef.current) {            
            setTimeout(() => {        
                window.scrollTo({
                    top: getVerticalOffset(gridItemRef.current),
                    behavior: 'smooth',
                });
            }, 300)            
        }

        // trigger event to datalayer
        if (selectedPetName !== id) datalayerEvent("custom_event", "naming_tool_name_click", DL_PAYLOAD)
         
    };

  return(
    <GridItem key={`griditm-${id}`}>
        <Button 
            className={`${cssPetNameButton} ${(selectedPetName === id) && isDesktop ? 'clicked' : null} ${isDesktop ? 'desktop' : null}`}
            ref={gridItemRef}
            size='lg' 
            w={'100%'} 
            maxW={getThemifiedResponsive(theme, 'view-name-button', 'maxWidth')}
            minW={getThemifiedResponsive(theme, 'view-name-button', 'minWidth')}
            color={getThemifiedResponsive(theme, 'view-name-button', 'color')}
            m='0' 
            key={`button-${id}`}
            onClick={reveal}> 
            {title} 
        </Button>
        { isOpen && <SplashDescription 
            id={id} 
            key={`splashdescr-${id}`}
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