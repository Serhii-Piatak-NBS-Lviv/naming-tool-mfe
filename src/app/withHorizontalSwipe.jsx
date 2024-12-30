import { useRef, useState } from "react";

/**
* @author
* @function 
* NOTE!!! Child component should be created via forwardRef !!!
* (see src/features/filter/AlphabetSelector.jsx as example)
**/

export const withHorizontalSwipe = (Component) => (props) => {
    const componentRef = useRef(null);
    const [isSwiping, setIsSwiping] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsSwiping(true);
        setStartX(e.pageX - componentRef.current.offsetLeft);
        setScrollLeft(componentRef.current.scrollLeft);
    };
    
    const handleMouseLeave = () => setIsSwiping(false);

    const handleMouseUp = () => setIsSwiping(false);

    const handleMouseMove = (e) => {
        if (!isSwiping) return;
        e.preventDefault();
        const x = e.pageX - componentRef.current.offsetLeft;
        const walk = x - startX;
        componentRef.current.scrollLeft = scrollLeft - walk;
    };

    return <Component 
            {...props} 
            ref={componentRef}
            onMouseDown={handleMouseDown} 
            onMouseLeave={handleMouseLeave} 
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        />
    
}; 