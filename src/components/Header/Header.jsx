import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";

function Header() {
  const { isLogin } = useSelector((state) => state.accountReducer);

  return (
    <div className="bg-transparent z-50 fixed top-0 left-0 w-full  ">
      <div className="flex lg:justify-between sm: justify-end py-1 lg:px-8 sm: px-4 items-center">
        <div className="w-32 h-20 rounded-full lg:block sm: hidden">
        <Link to="/" className="md:block hidden w-[148px] ">
          <img
            src="/assests/images/LogoDesktop.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
        
        </div>

        <div>
          {isLogin ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login">
              <button className="bg-black text-white py-2 px-4 text-[16px] rounded-3xl">
                Get started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
