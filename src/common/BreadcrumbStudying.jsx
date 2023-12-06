import React from "react";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumb } from "antd";

export default function BreadcrumbStudying() {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);
  const capitalize = (s) =>
    s && typeof s === "string" ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  return (
    <div>
      <Breadcrumb
        separator={<NavigateNextIcon className="text-[20px]" />}
        aria-label="breadcrumb"
        className=" pb-[3%] text-[20px]  text-[#453f3f]  "
      >
        {pathnames.map((name, index) => {
          const isSecondToLast = index === pathnames.length - 2;
          const formattedName = capitalize(
            decodeURIComponent(name.replace(/-/g, " "))
          );

          if (isSecondToLast && pathnames.length > 3) {
            return null;
          }

          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Breadcrumb.Item key={index}>{formattedName}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <Link
                className="!h-0"
                to={`/${pathnames.slice(0, index + 1).join("/")}`}
              >
                {index === 0 ? (
                 
                  <HomeIcon sx={{ mr: 0.5, fontSize:"20px" }} />
               
                ) : (
                  <span className="text-[20px]">{formattedName}</span>
                )}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
