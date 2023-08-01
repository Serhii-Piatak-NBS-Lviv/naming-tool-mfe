import FONTS_REGISTRY from './fonts';

/**
 *   
 */

export const themes = {
    "default": {
        
        "app-container": {
            "backgroundColor": 'rgb(249, 248, 245)',
            "paddingLeft": '5%',
            "paddingRight": '5%',
            "paddingTop": '40px',
            "paddingBottom": '80px',
        },

        "view-name-button": {
            "backgroundColor": '#FFF !important',
            "boxShadow": '0px 2px 12px 0px rgba(58,53,51,0.1), 0px 0px 2px 0px rgba(58,53,51,0.2)',
            "borderRadius": '8px !important',
            "height": '56px !important',
            "padding": '16px 24px',
            "fontFamily": 'Roboto Slab',
            "fontSize": '20px !important',
            "fontWeight": '400 !important',
            "lineHeight": '24px !important',
        },

        "view-cardwrapper": {
            "position": 'relative',
            "border": 'solid 1px red !important',
            "boxShadow": '0px 4px 16px 0px rgba(0,0,0,0.1) !important',
            "borderRadius": '8px !important',
            "padding": '48px',
        },

        "view-nametitle": {
            "fontFamily": 'Roboto Slab',
            "color": 'rgb(58, 53, 51)',
            "fontWeight": '400 !important',
        },

        "view-namesubtitle": {
            "fontFamily": 'Roboto !important',
            "fontWeight": '300 !important',
            "fontSize": '16px !important',
            "lineHeight": '24px !important',
            "color": 'rgb(201, 197, 185)',
        },

        "view-namesubtitle__strong": {
            "fontWeight": '600 !important',
            "color": 'rgb(107, 104, 104)',
        },

        "view-namedescription": {
            "borderTop": '1px solid rgb(201, 197, 185)',
            "borderBottom": '1px solid rgb(201, 197, 185)',
        },

        "view-namedescription__text": {
            "fontFamily": 'Roboto !important',
            "fontSize": '20px !important',
            "lineHeight": '32px !important',
            "fontWeight": '300 !important',
            "color": 'rgb(107, 104, 104)',
        },

        "fonts-list": [],

        // * following is for  Web Font Loader */
        //for using Google's Font API,
        "google-fonts": ['Roboto Slab', 'Roboto'],
    },

    // =========== Add your themes declaration here ====================
    // "myCustomTheme": {
        

        // "fonts-list": ['deutsch_gothicnormal'],

        // * following is for  Web Font Loader */
        //for using Google's Font API,
        // "google-fonts": ['Chilanka', 'IBM Plex Mono'],
    // }
    // ==================================================
};

// *********************************************
//**   DON'T  DELETE FUNCTIONS  BELOW !!! **/
// *********************************************
const themify = (theme, component) => {
    return themes[theme][component];
};

export const fontsLoader = (theme) => {
    const fontsList = themes['default']["fonts-list"];

    if ((theme !== 'default') && (themes[theme]["fonts-list"].length)) {
        themes[theme]["fonts-list"].forEach(
            fnt => {if (!fontsList.includes(fnt)) fontsList.push(fnt)}
        );
    };

    const loaderExpression = fontsList.reduce(
        (acc, itm) => {
            acc = acc + `@font-face {
                font-family: ${itm};
                src: ${FONTS_REGISTRY[itm]["sources"]};
                font-weight: ${FONTS_REGISTRY[itm]["fontWeight"]};
                font-style: ${FONTS_REGISTRY[itm]["fontStyle"]};
            };` + `\n`;
            return acc;
        }, ``
    );
    return loaderExpression;
};

export default themify;