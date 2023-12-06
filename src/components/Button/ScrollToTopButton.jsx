import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  return (
    <div>
      {backToTopButton && (
        <button
          x-data="topBtn"
          id="topButton"
          onClick={scrollUp}
          className="fixed lg:bottom-10 sm: bottom-6 lg:right-10 sm: right-6 z-50 animate-bounce rounded-full bg-gray-100 lg:w-16 sm: w-12 lg:h-16 sm: h-12 justify-center items-center shadow-md"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;
