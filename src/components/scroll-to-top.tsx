'use client';

import { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener('scroll', toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
  };

  return (
    <div className="fixed top-[92vh] right-3 z-20">
      <div
        className={`z-10 w-14 h-14 text-2xl ${isVisible ? 'block' : 'hidden'}`}
      >
        <button
          onClick={scrollToTop}
          className="relative flex items-center justify-center w-full h-full bg-primary overflow-hidden text-white duration-300 rounded-full group hover:scale-105"
        >
          <AiOutlineArrowUp />
        </button>
      </div>
    </div>
  );
};
