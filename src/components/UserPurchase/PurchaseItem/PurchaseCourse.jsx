import React, { useEffect, useState } from "react";
import courseApi from "../../../api/courseApi";

function PurchaseCourse({ id }) {
  const [course, setCourse] = useState();

  const getCourseDetail = async (id) => {
    if (id) {
      try {
        const res = await courseApi.getCourseDetail(id);
        setCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCourseDetail(id);
    // console.log(course);
  }, []);
  return (
    <>
      <div className="block lg:w-40 sm: w-24 h-full lg:mr-6 sm: mr-2">
        <img
          src={course.image}
          // onClick={}
          alt="404"
          className="w-full h-full col-span-2"
        />
      </div>
      <div className="h-full flex flex-col justify-between lg:mr-0 sm: mr-2">
        <h1 className="font-bold text-[20px] ">{course && course?.name}</h1>

        <p className="lg:text-lg sm: text-sm text-[#4c4c4c]">
          <span className="text-black font-bold">Mentor: </span>
          SonTT
        </p>
      </div>
      <div className="h-full flex items-center justify-end">
        <h1 className="lg:text-xl sm: text-lg text-[#15579d] font-bold">
          500 $
        </h1>
      </div>
    </>
  );
}

export default PurchaseCourse;
