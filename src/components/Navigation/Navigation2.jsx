import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import ProfileDropdown from "../Header/ProfileDropdown/ProfileDropdown";
import { Link, NavLink, useLocation } from "react-router-dom";
import CatalogNav from "./CatalogNav/CatalogNav";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/slices/cartSlice";
import NavbarMobile from "./NavbarMobile";
import AutocompleteSearch from "./AutocompleteSearch";

export default function Navigation2() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalQuantity, coursesInOrder } = useSelector(
    (state) => state.cartReducer
  );
  const { isLogin } = useSelector((state) => state.accountReducer);
  const [showNav, setShowNav] = useState(false);

  //handle
  const handleShowMobileNav = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <div className="h-20 md:bg-white bg-black flex lg:py-3 md: py-2  relative  items-center justify-between  md:border-b border-solid border-gray_2 px-4">
        <Link to="/" className="md:block hidden w-[148px] ">
          <img
            src="/assests/images/LogoDesktop.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
        <FontAwesomeIcon
          className={`md:hidden block  ${
            showNav ? "text-purple_1" : "text-white"
          }`}
          onClick={() => handleShowMobileNav()}
          icon={faBars}
        />
        <NavbarMobile show={showNav} handleMobileNav={handleShowMobileNav} />
        <Link to="/" className="md:hidden  block w-[148px] ">
          <img
            src="/assests/images/LogoApp.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
        {/* xl:w-[500px] lg:w-[450px] md:w-[350px] w-[200px] */}

        <div className="relative md:block hidden w-[40%]">
          <AutocompleteSearch />
        </div>
        {isLogin ? (
          <div className="flex items-center lg:gap-8 gap-4">
            <ul className="  items-center md:flex hidden  text-[17px] font-normal    ">
              <li>
                <NavLink
                  to="/studyingcourse"
                  className={` ${
                    location.pathname === "/studyingcourse"
                      ? " bg-blue_5 p-2 text-white rounded-[15px] relative after:absolute after:bottom-[-7px] after:left-[50%] after:translate-x-[-50%] after:transform after:rotate-45  after:w-[15px] after:h-[15px] after:bg-blue_5 "
                      : "p-2 text-black "
                  }`}
                >
                  Studying Progress
                </NavLink>
              </li>
              {/* <li>
              <NavLink
                to="/subcription"
                className={` lg:block hidden ${
                  location.pathname === "/subcription"
                    ? " bg-blue_5 p-2 text-white rounded-[15px] relative after:absolute after:bottom-[-7px] after:left-[50%] after:translate-x-[-50%] after:transform after:rotate-45  after:w-[15px] after:h-[15px] after:bg-blue_5 "
                    : "p-2 text-black "
                }`}
              >
                Subcription
              </NavLink>
            </li> */}
            </ul>

            <div className="flex items-center gap-5">
              <Link to="/cart" className="block relative">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-[20px] md:text-black text-white block "
                />
                <p className="text-[10px] w-4 h-4 flex justify-center items-center bg-red-500 text-white rounded-full p-[2px] absolute -top-2 -right-2">
                  {totalQuantity}
                </p>
              </Link>
              <ProfileDropdown />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="md:bg-black md:text-white bg-white text-black py-2 px-4 text-[16px] rounded-3xl">
              Get started
            </button>
          </Link>
        )}
      </div>

      {isLogin &&
      !location.pathname.includes("/studyingcourse") &&
      !location.pathname.includes("/courses/course-detail") &&
      location.pathname !== "/profile" ? (
        <CatalogNav />
      ) : (
        ""
      )}
    </>
  );
}
