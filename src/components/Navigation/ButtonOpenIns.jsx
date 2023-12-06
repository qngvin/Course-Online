import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function ButtonOpenIns() {
  const [showNav, setShowNav] = useState(false);

  //handle
  const handleShowMobileNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <FontAwesomeIcon
        className={`md:hidden block  ${
          showNav ? "text-purple_1" : "text-black"
        }`}
        onClick={() => handleShowMobileNav()}
        icon={faBars}
      />
    </>
  );
}

export default ButtonOpenIns;
