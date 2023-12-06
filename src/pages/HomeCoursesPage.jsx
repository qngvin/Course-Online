import React, { useEffect } from "react";

import ListCoursesCard from "../components/HomeCoursesPage/ListCourses/ListCoursesCard";
import HeaderReusable from "../components/Admin/HeaderReusable";
import { useDispatch, useSelector } from "react-redux";
import { getYourCourse } from "../store/slices/userSlice";
import BreadcrumbView from "../common/BreadcrumbStudying";

function HomeCoursesPage() {
  const { yourCourse } = useSelector((state) => state.userReducer);

  return (
    <div className="py-[2%] px-[5%]">
      <HeaderReusable text={"Studying Progresss"} border={"0"} />

      <div className="flex text-[18px] text-text_color_base gap-5 ">
        <p className="px-4 border border-solid border-gray_4 rounded-[20px]">
          All
        </p>
        <p className="px-4 border border-solid border-gray_4 rounded-[20px]">
          Active
        </p>
        <p className="px-4 border border-solid border-gray_4 rounded-[20px]">
          Completed
        </p>
      </div>
      <div className="flex lg:flex-row sm: flex-col pt-4 gap-x-10 lg:gap-y-10 sm: gap-y-4">
        {yourCourse &&
          yourCourse.list.map((course,index) => <ListCoursesCard key={index} course={course} />)}
      </div>
    </div>
  );
}

export default HomeCoursesPage;
