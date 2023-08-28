import FONTS_REGISTRY from './fonts';
import { keyframes } from '@emotion/css';

/**
 *   
 */

const fadeOut = keyframes({
    "0%": {opacity: 1},
    "100%": {opacity: 0},
});

export const themes = {
    "default": {          
        
        "app-container": {
            "backgroundColor": 'rgb(249, 248, 245)',
            "paddingLeft": '5%',
            "paddingRight": '5%',
            "paddingTop": '40px',
            "paddingBottom": '80px',
        },

        "filters": {
            "width": '100%',
            "maxWidth": '1109px',            
            "transition": '.5s',
            "backgroundColor": 'rgb(249, 248, 245)',
            "zIndex": '10',

            "@media (max-width: 991px)": {
                "position": 'sticky',
                "width": '100vw',
                "paddingLeft": '5%',
                "paddingRight": '5%',
            }
        },

        "form-filters-title": {
            "color": '#3A3533',
            "fontFamily": 'Roboto Slab',
            "fontSize": '20px',
            "fontStyle": 'normal',
            "fontWeight": '400',
            "lineHeight": '32px',
            "marginBottom": '8px',
            
            "@media (max-width: 768px)": {
                "fontSize": '16px',
                "lineHeight": '24px',
                "marginBottom": '16px',
            }
        }, 

        "form-filters-wrapper": {
            "marginBottom": '20px',
            "display":'grid',
            "gridTemplateColumns": '65.5% 34.5%',
            "gridTemplateRows": 'auto auto',
            "gridTemplateAreas": "'swiper gender' 'alphabet alphabet'",

            "@media (max-width: 768px)": {
                "gridTemplateColumns": '100%',
                "gridTemplateRows": 'auto auto auto',
                "gridTemplateAreas": "'swiper' 'alphabet' 'gender'",
                "marginBottom": '0',
            }
        },

        "filters-swiper-wrapper": {
            "maxWidth": '100%',
            "minWidth": '0',
            "height": 'auto',
            "padding": '2px 0',
            "marginRight": '30px',
            "position": 'relative',
            "gridArea": 'swiper',

            "@media (max-width: 768px)": {
                "marginRight": '0',
                "padding": '0'
            },            

            "&:after": {
                "position": 'absolute',
                "top": '0',
                "left": '0',
                "content": '""',
                "width": '32px',
                "height": '100%',
                "background": 'linear-gradient(90deg, rgb(249, 248, 245) 46.19%, rgba(249, 248, 245, 0.00) 98.11%)',
                "zIndex": '9',

                "@media (max-width: 768px)": {
                    "width": '20px',
                },
            },

            "&:before": {
                "position": 'absolute',
                "top": '0',
                "right": '0',
                "content": '""',
                "width": '32px',
                "height": '100%',
                "background": 'linear-gradient(270deg, rgb(249, 248, 245) 46.88%, rgba(249, 248, 245, 0.00) 100%)',
                "zIndex": '9',

                "@media (max-width: 768px)": {
                    "width": '20px',
                },
            }
        },

        "filter-category": {
            "padding": '13px 10px',
            "width": '124px',
            "minWidth": '75px',
            // "height": '100px',
            "transition": '.3s',
            "cursor": 'grab',
            "display": 'flex',
            "flexDirection": 'column',
            "justifyContent": 'space-between',
            "alignItems": 'center', 
            "borderRadius": '4px',  
            "border": '0.5px solid  rgb(249, 248, 245)',  
            "overflow": 'hidden',
            
            "@media (max-width: 768px)": {
                "width": '75px',
                "padding": '8px 10px',
                // "height": '64px',
            }
        }, 

        "isActive": {        
            "border": '0.5px solid  #E81C24',
            "background":   '#FFF',
            "boxShadow": '0px 2px 12px 0px rgba(58, 53, 51, 0.10), 0px 0px 2px 0px rgba(58, 53, 51, 0.20)',
        },

        "filter-category-title": {
            "color": '#3A3533',
            "fontFamily": 'Roboto',
            "fontSize": '16px',
            "fontStyle": 'normal',
            "fontWeight": '400',
            "lineHeight": '18px',
            "userSelect": 'none',
            "textAlign": 'center',
            "cursor": 'pointer',

            "@media (max-width: 768px)": {
                "fontSize": '14px',
                "lineHeight": '16px',
            }
        },

        "filter-category-image": {
            "width": '48px',
            "height": '48px',
            "marginBottom": '8px',
            "userSelect": 'none',
            "cursor": 'pointer',

            "@media (max-width: 768px)": {
                "width": '24px',
                "height": '24px',                
            }
        },

        "filter-gender-section": {
            "gridArea": 'gender',
            "width": 'fit-content',
            "marginLeft": 'auto',
            'height': '100%',
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',

            "@media (max-width: 768px)": {
                "margin": '16px auto 24px',
                "display": 'block',
            }
        },        

        "filter-gender-section-title": {
            "color": '#3A3533',
            "fontFamily": 'Roboto',
            "fontSize": '16px',
            "fontStyle": 'normal',
            "fontWeight": '300',
            "lineHeight": '24px', 
            "marginBottom": '12px',

            "@media (max-width: 768px)": {
                "display": 'none',
            } 
        },

        'filter-gender-label': {
            "color": '#3A3533',
            "fontFamily": 'Roboto',
            "fontSize": '16px',
            "fontStyle": 'normal',
            "fontWeight": '400',
            "lineHeight": '24px', 
            "margin": '0 18px 0 0',
            "paddingLeft": '33px',
            "cursor": 'pointer',
            "display": 'block',
            "position": 'relative',
            "transition": '.3s',

            '&:last-child': {
                "margin": '0'
            },

            "@media (max-width: 768px)": {
                "fontSize": '14px',
                "lineHeight": '20px',
                "paddingLeft": '24px',
            },

            "&:after": {
                "position": 'absolute',
                "top": '0',
                "left": '0',
                "content": '""',
                "width": '24px',
                "height": '24px',
                "cursor": 'pointer',
                "border": 'solid 1.5px #C9C5B9',
                "borderRadius": '50%',

                

                "@media (max-width: 768px)": {
                    "width": '18px',
                    "height": '18px',
                }
            },
        },

        "filter-gender-input-active": {

            "&:after": {
                "border": 'solid 1.5px #E81C24',
            },

            "&:before": {
                "position": 'absolute',
                "top": '6px',
                "left": '6px',
                "content": '""',
                "width": '12px',
                "height": '12px',
                "background": '#E81C24',
                "borderRadius": '50%',

                

                "@media (max-width: 768px)": {
                    "top": '5px',
                    "left": '5px',
                    "width": '8px',
                    "height": '8px',
                }
            },
        },

        "filter-alphabetical-container": {
            "marginTop": '16px',
            "position": 'relative',
            "gridArea": 'alphabet',
            "height": 'fit-content',

            "@media (max-width: 768px)": {
                "marginTop": '8px',
            },

            "&:after": {
                "position": 'absolute',
                "top": '0',
                "left": '0',
                "content": '""',
                "width": '34px',
                "height": '100%',
                "background": 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #fff 71.26%);',
                "borderRadius": '34px 0 0 34px',
                "opacity": '.5',

                "@media (max-width: 768px)": {
                    "width": '22px',
                },
            },

            "&:before": {
                "position": 'absolute',
                "top": '0',
                "right": '0',
                "content": '""',
                "width": '34px',
                "height": '100%',                
                "background": 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #fff 71.26%);',
                "borderRadius": '0 34px 34px 0',
                "opacity": '.5',
                "zIndex": '9',

                "@media (max-width: 768px)": {
                    "width": '22px',
                },
            }
        },

        "filter-alphabetical-list": {            
            "listStyle": 'none',
            "maxWidth": '100%',
            "display": '-webkit-box',
            "overflow": 'scroll',
            "background": '#FFFFFF',
            "boxShadow": '0px 0px 2px rgba(58, 53, 51, 0.2), 0px 2px 12px rgba(58, 53, 51, 0.1)',
            "borderRadius": '100px',
            "margin": '0 auto',
            "padding": '16px',   
            "scrollbarWidth": 'none',

            "&::-webkit-scrollbar": {
                'display': 'none',
            },
            
            "@media (max-width: 768px)": {
                "padding": '8px 16px',
            }
        },

        "filter-alphabetical-letter": {          
            "margin": '0 2px',
            "width": '37px',
            "height": '37px',
            "textAlign": 'center',
            "fontFamily": 'Roboto Slab',
            "fontStyle": 'normal',
            "fontWeight": '300',
            "fontSize": '25px',
            "lineHeight": '35px',
            "color": '#3A3533',            
            "backgroundColor": 'inherit',
            "cursor": 'pointer',
            "borderRadius": '100%',
            "transition": '.3s', 

            "@media (max-width: 768px)": {
                "fontSize": '20px',
                "lineHeight": '24px',
                "margin": '0 3.5px',
                "width": '26px',
                "height": '26px',
            }
        },

        "filter-alphabetical-letter-active": {
            "background": '#E81C24',
            "color": '#FFFFFF',
            "boxShadow": '0px 2px 12px 0px rgba(58, 53, 51, 0.10), 0px 0px 2px 0px rgba(58, 53, 51, 0.20)',
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

            "@media(max-width: 584px)": {
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
            "color": '#6B6868',
        },

        "view-namedescription__arrow": {
            "position": 'absolute',
            "height": '20px',
            "width": '20px',
            "top": '-11px',
            "borderLeft": 'solid 1px red',
            "borderTop": 'solid 1px red',
            "background": '#fff',
            "transform": 'rotate(45deg)',

            "@media(max-width: 584px)": {
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

        "no-result-wrapper": {
            "padding": '144px 0',

            "@media (max-width: 768px)": {
                "padding": '64px 0',
            }
        },

        "no-result-title": {
            "color": '#3A3533',
            'textAlign': 'center',
            "fontFamily": 'Roboto Slab',
            "fontSize": '25px',
            "fontStyle": 'normal',
            "fontWeight": '400',
            "lineHeight": '35px',
            "marginBottom": '8px',

            "@media (max-width: 768px)": {
                "fontSize": '20px',
                "lineHeight": '26px',
            }
        },

        "no-result-description": {
            "color": '#3A3533',
            'textAlign': 'center',
            "fontFamily": 'Roboto Slab',
            "fontSize": '16px',
            "fontStyle": 'normal',
            "fontWeight": '400',
            "lineHeight": '24px',
        },

        "view-loadmore-thatsall": {
            "background": 'rgb(58, 53, 51)',
            "color": '#FFF',
            "padding": '10px 16px',
            "fontFamily": 'Roboto Slab',
            "fontSize": '16px',
            "fontWeight": '400',
            "lineHeight": '24px',
            "textAlign": 'center',

            '&.hidden': {
                "animationDuration": '3s',
                "animationFillMode": 'both',
                "animationName": fadeOut,
                "WebkitAnimationDuration": '3s',
                "WebkitAnimationFillMode": 'both',
                "WebkitAnimationName": fadeOut,
            },
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