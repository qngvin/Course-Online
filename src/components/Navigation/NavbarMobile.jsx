import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import storageService from "../../api/storageService";
import AutocompleteSearch from "./AutocompleteSearch";
import { Dropdown, Menu } from "antd";

export default function NavbarMobile({ show, handleMobileNav }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { catalog } = useSelector((state) => state.courseReducer);
  const decodedCurrentPath = decodeURIComponent(location.pathname);
  const menuItems = catalog?.map((catl) => ({
    key: catl.id,
    label: (
      <Link
        key={catl.id}
        to={`courses/${catl.name.replace(/ /g, "-")}`}
        className={`px-3 lg:text-[16px] text-[14px] ${
          decodedCurrentPath.includes(catl.name.replace(/ /g, "-"))
            ? "text-[#4752a5] font-semibold"
            : ""
        }`}
      >
        {catl.name}
      </Link>
    ),
  }));
  const menuCatalog = (
    <Menu>
      {menuItems?.map((item) => (
        <Menu.Item key={item.key} disabled={item.disabled} danger={item.danger}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  const handleLogout = () => {
    storageService.removeAccessToken();
    dispatch(setIsLogin(false));
    dispatch(setRole(""));
    storageService.removeRole();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={` absolute top-[97%] md:hidden block  w-[200px] h-screen z-[300] bg-black text-white transition-all duration-1000   ${
        show ? "left-0 " : "left-[-100%]"
      }`}
    >
      <AutocompleteSearch />
      <ul className="w-full h-full flex flex-col items-start px-4 py-4 gap-y-4">
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <Link to="/">
            <p>Home</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px] "
          onClick={handleMobileNav}
        >
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px] "
          onClick={handleMobileNav}
        >
          <Link to="/my-purchase">My Purchase</Link>
        </li>

        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px] "
          onClick={handleMobileNav}
        >
          <Dropdown placement="right" overlay={menuCatalog}>
            <p className="hover:text-purple_1 text-white">Categories</p>
          </Dropdown>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <Link to="/studyingcourse">
            <p>Studying Course</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <button onClick={handleLogout} className=" w-full text-left">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
