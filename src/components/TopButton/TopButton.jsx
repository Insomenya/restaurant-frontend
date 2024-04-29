import { useEffect, useState } from 'react';
import classes from './TopButton.module.css';
import { GoArrowUp } from 'react-icons/go'

export { TopButton };

function TopButton({displayAfter, target}) {
    const [showButton, setShowButton] = useState(false);
    const handleShowButton = () => {
        if (!showButton && window.scrollY > displayAfter) {
            setShowButton(true);
            return;
        }
        if (!showButton && window.scrollY <= displayAfter) {
            setShowButton(false);
            return;
        }
    };

    window.addEventListener("scroll", handleShowButton);

    useEffect(() => {
        return window.removeEventListener("scroll", handleShowButton);
    });

    const scrollToRef = (target) => {
        window.scrollTo({
            top: target.current.offsetTop,
            behavior: "smooth"
        });
    };

    if (showButton) {
        return (
            <div className={`${classes.top_button}`} onClick={() => { scrollToRef(target) }}>
                <GoArrowUp></GoArrowUp>
            </div>
        );
    } else {
        return null;
    }
}