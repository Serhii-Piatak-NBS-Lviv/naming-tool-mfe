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

            ":hover": {
                "backgroundColor": '#E81C24 !important',
                "color": '#FFF',
            },
        },

        "view-cardwrapper": {
            "position": 'relative',
            "border": 'solid 1px red !important',
            "boxShadow": '0px 4px 16px 0px rgba(0,0,0,0.1) !important',
            "borderRadius": '8px !important',
            "marginTop": '22px',
            "padding": '48px',

            "@media(max-width: 648px)": {
                "marginTop": '-56px',
            }
        },

        "view-nametitle": {
            "fontFamily": 'Roboto Slab',
            "color": 'rgb(58, 53, 51)',
            "fontWeight": '400 !important',
        },

        "view-namesubtitle": {
            "fontFamily": 'Roboto !important',
            "fontWeight": '300 !important',
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
            "fontWeight": '300 !important',
            "color": 'rgb(191, 191, 191)',
        },

        "view-namedescription__arrow": {
            "position": 'absolute',
            "height": '20px',
            "width": '20px',
            "top": '-11px',
            "borderLeft": 'solid 1px red',
            "border-top": 'solid 1px red',
            "background": '#fff',
            "transform": 'rotate(45deg)',

            "@media(max-width: 648px)": {
                "display": 'none',
            },
        },

        "view-shareicon": {
            "fontSize": '24px !important',
            "color": '#E81C24 !important',
            "cursor": 'pointer',
        },

        "view-namedescription__close": {
            "background": 'transparent !important',
            "color": '#E81C24 !important',
        },

        "view-loadmore-button": {
            "background": '#E81C24 !important',
            "color": '#FFF !important',
            "fontFamily": 'Roboto Slab !important',
            "fontWeight": '400 !important',
            "fontSize": '16px !important',
            "lineHeight": '24px !important',
        },

        "view-loadmore-flex": {
            "marginTop": '32px',
        },

        "chakra-adaptive-arrays": {
            "view-namedescription": {
                "maxWidth": ['100%', '100%', '70%'],
            },

            "view-nametitle": {
                "fontSize": ['25px', '40px', '60px'],
                "lineHeight": ['35px', '44px', '66px'],
            },

            "view-namesubtitle": {
                "fontSize": ['12px', '14px', '16px'],
                "lineHeight": ['20px', '22px', '24px'],
            },

            "view-namedescription__text": {
                "fontSize": ['14px', '17px', '20px'],
                "lineHeight": ['20px', '26px', '32px'],
            },

            "view-cardwrapper": {
                "padding": ['16px 24px', '25px 32px', '48px'],
                "marginTop": ['-56px', '22px'],
            },

            "view-cardheading": {
                "padding": ['0', '10px', '20px'],
            },

            "view-cardbody": {
                "padding": ['16px 0px', '20px 10px', '24px 20px'],
            },

            "view-cardfooter": {
                "padding": ['16px 0px', '20px 10px', '20px'],
            },

            "view-shareicon": {
                "fontSize": ['32px !important', '29px !important', '24px !important'],
            },

            "view-namedescription__close": {
                "top": ['6px', '11px', '16px'],
                "right": ['0px', '8px', '16px'],
            },
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

export const getThemifiedResponsive = (theme, component, dimension) => {
    if ((theme !== 'default') && (themes[theme]["chakra-adaptive-arrays"][component][dimension])) {
        return [...themes[theme]["chakra-adaptive-arrays"][component][dimension]];
    };

    if (themes['default']["chakra-adaptive-arrays"][component][dimension]) {
        return [...themes['default']["chakra-adaptive-arrays"][component][dimension]];
    };

    return [];
};

export default themify;