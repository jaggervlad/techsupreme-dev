'use client';

import { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

export const ScrollToTopButton = ({ className }: { className?: string }) => {
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
    <div className={className}>
      <div className={`w-12 h-12 text-2xl ${isVisible ? 'block' : 'hidden'}`}>
        <button
          onClick={scrollToTop}
          className="relative flex items-center justify-center w-full h-full overflow-hidden text-white duration-300 border border-white rounded-full group hover:scale-105"
        >
          <AiOutlineArrowUp />
        </button>
      </div>
    </div>
  );
};
