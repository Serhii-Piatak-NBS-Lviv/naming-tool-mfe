import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { useDispatch, useSelector } from 'react-redux';

import { css, cx } from '@emotion/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import SwiperCore, { Mousewheel } from "swiper/core";

import { setSelectedCategory } from './filterSlice';

import SwiperCategoryItem from './SwiperCategoryItem';

const swiperDefault = css`
  transition: .3s;
.swiper,
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  display: block;
}
.swiper-vertical > .swiper-wrapper {
  flex-direction: column;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
  box-sizing: content-box;
}
.swiper-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-horizontal {
  touch-action: pan-y;
}
.swiper-vertical {
  touch-action: pan-x;
}
.swiper-slide,
swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  display: block;
}
.swiper-slide-invisible-blank {
  visibility: hidden;
}
/* Auto Height */
.swiper-autoheight,
.swiper-autoheight .swiper-slide {
  height: auto;
}
.swiper-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: transform, height;
}
.swiper-backface-hidden .swiper-slide {
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
/* 3D Effects */
.swiper-3d.swiper-css-mode .swiper-wrapper {
  perspective: 1200px;
}
.swiper-3d .swiper-wrapper {
  transform-style: preserve-3d;
}
.swiper-3d {
  perspective: 1200px;
}
.swiper-3d .swiper-slide,
.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top,
.swiper-3d .swiper-slide-shadow-bottom,
.swiper-3d .swiper-cube-shadow {
  transform-style: preserve-3d;
}
.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top,
.swiper-3d .swiper-slide-shadow-bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
.swiper-3d .swiper-slide-shadow {
  background: rgba(0, 0, 0, 0.15);
}
.swiper-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
/* CSS Mode */
.swiper-css-mode > .swiper-wrapper {
  overflow: auto;
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}
.swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
  display: none;
}
.swiper-css-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: start start;
}
.swiper-horizontal.swiper-css-mode > .swiper-wrapper {
  scroll-snap-type: x mandatory;
}
.swiper-vertical.swiper-css-mode > .swiper-wrapper {
  scroll-snap-type: y mandatory;
}
.swiper-css-mode.swiper-free-mode > .swiper-wrapper {
  scroll-snap-type: none;
}
.swiper-css-mode.swiper-free-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: none;
}
.swiper-centered > .swiper-wrapper::before {
  content: '';
  flex-shrink: 0;
  order: 9999;
}
.swiper-centered > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: center center;
  scroll-snap-stop: always;
}
.swiper-centered.swiper-horizontal > .swiper-wrapper > .swiper-slide:first-child {
  margin-inline-start: var(--swiper-centered-offset-before);
}
.swiper-centered.swiper-horizontal > .swiper-wrapper::before {
  height: 100%;
  min-height: 1px;
  width: var(--swiper-centered-offset-after);
}
.swiper-centered.swiper-vertical > .swiper-wrapper > .swiper-slide:first-child {
  margin-block-start: var(--swiper-centered-offset-before);
}
.swiper-centered.swiper-vertical > .swiper-wrapper::before {
  width: 100%;
  min-width: 1px;
  height: var(--swiper-centered-offset-after);
}
.swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  box-sizing: border-box;
  border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
  border-radius: 50%;
  border-top-color: transparent;
}
.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,
swiper-container:not(.swiper-watch-progress) .swiper-lazy-preloader,
.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader {
  animation: swiper-preloader-spin 1s infinite linear;
}
.swiper-lazy-preloader-white {
  --swiper-preloader-color: #fff;
}
.swiper-lazy-preloader-black {
  --swiper-preloader-color: #000;
}
@keyframes swiper-preloader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

const swiperNav = css`
    .swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: var(--swiper-navigation-top-offset, 50%);
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
  &.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
  }
  &.swiper-button-hidden {
    opacity: 0;
    cursor: auto;
    pointer-events: none;
  }
  .swiper-navigation-disabled & {
    display: none !important;
  }
  &:after {
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
  }
}
.swiper-button-prev,
.swiper-rtl .swiper-button-next {
  &:after {
    content: 'prev';
  }
  left: var(--swiper-navigation-sides-offset, 10px);
  right: auto;
}
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  &:after {
    content: 'next';
  }
  right: var(--swiper-navigation-sides-offset, 10px);
  left: auto;
}
.swiper-button-lock {
  display: none;
}
`

const cssSwiperNesting = css`
    & .swiper {
        max-width: 94%;
        position: static;
        padding: 0 9px;
    };

    & .swiper .swiper-wrapper {
        align-items: center;
    }

    & .swiper .swiper-slide {
        width: fit-content;
    }

    & .swiper .swiper-button-next, & .swiper .swiper-button-prev {
        top: 50%;
        transform: translateY(-50%);
        width: auto;
        transition: .3s;        
    };

    & .swiper .swiper-button-next {
        right: 0px;
    };

    & .swiper .swiper-button-prev {
        left: 0px;
    };

    & .swiper .swiper-button-disabled {
        opacity: 0;
    }

    & .swiper .swiper-button-prev:after {
        content: '';
        display: inline-block;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 19L6.5 12L17 5" stroke="%233A3533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        height: 24px;
        width: 24px;
    }

    & .swiper .swiper-button-next:after {
        content: '';
        display: inline-block;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 19L18.5 12L8 5" stroke="%233A3533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        height: 24px;
        width: 24px;
    }
`;

export const SwiperFilters = ({restAPI, handleFilter}) => {

  const dispatch = useDispatch();

  const activeFilters = useSelector(state => state.filter.selectedCategories);  

  const setActiveItem = () => {
    if(window.innerWidth > 768) {
      return activeFilters ? {paddingLeft: '124px'} : {paddingLeft: '0'}
    }
    return activeFilters ? {paddingLeft: '92px'} : {paddingLeft: '0'}
  }

  const setIconUrl = (category) => {
    const device = window.innerWidth > 768 ? 'desktop_tablet' : 'mobile';
    const { icon_desktop_tablet, icon_mobile } = category;    

    return require(`../../app/images/${device}/${window.innerWidth > 768 ? icon_desktop_tablet : icon_mobile}`);
};

  const [cssCategoryWrapper] = useThemifiedComponent('filter-category');  
  const [cssCategoryIsActive] = useThemifiedComponent('isActive');
  const [cssTitle] = useThemifiedComponent('filter-category-title');
  const [cssImage] = useThemifiedComponent('filter-category-image');  

  SwiperCore.use([Mousewheel]);
  return (
    <>
      <div 
        style={{
          position: 'absolute', 
          left: '26px', 
          top: '50%',
          transform: 'translateY(-50%)', 
          zIndex: '99'
        }}
      >
        {
          restAPI.list
          .filter(el => el.id === activeFilters ? el : null)
          .map(el => (
            <div 
              key={el.id}
              className={cx(cssCategoryWrapper, cssCategoryIsActive)}
              onClick={() => dispatch(setSelectedCategory(''))}
            >
              <img 
                className={cssImage}
                src={setIconUrl(el)} 
                alt={el.title} 
              />
              <span className={cssTitle}>
                {el.title}
              </span>
            </div>))
        }
      </div>
      <div 
        className={cx(swiperDefault, swiperNav, cssSwiperNesting)}  
        mx="auto"
        style={setActiveItem()}>
        <Swiper
          position="static"
          modules={[Navigation, A11y]}
          spaceBetween={8}
          navigation
          mousewheel={true}
          slidesPerView="auto"                
        >
          {restAPI.list
          .filter(el => el.id !== activeFilters)
          .map((category) => {
            return (
              <SwiperSlide key={category.id}>
                <SwiperCategoryItem 
                  category={category} 
                  handleFilter={handleFilter} 
                  setIconUrl={setIconUrl}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>     
    </>           
  )
}
