import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ReusableCourse({ course, onClick }) {
  return (
    <div
      key={course.id}
      onClick={() => onClick()}
      className="flex justify-between items-center gap-4 p-2 mb-4 w-full rounded-[5px] shadow-box_shadow_11 hover:transform hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-box_shadow_10 transition-transform duration-300"
    >
      <div className="flex gap-4">
        <img className="h-14 w-14 bg-cover rounded-[5px]" src={course.image} />
        <div className="flex flex-col">
          {" "}
          <h1 className="font-medium text-[18px] line-clamp-1">
            {course.name}
          </h1>
          <p className="text-[#00000069]">
            Total Learner {course.learnerQuantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col  items-end">
        <h1 className="font-medium text-[#6f7427] text-[18px]">
          ${course.price}
        </h1>
        <div className="flex items-center gap-1 text-[13px] text-[#ffd100]">
          <p>{course.avgRate}</p>{" "}
          <FontAwesomeIcon className="text-[11px]" icon={faStar} />
        </div>
      </div>
    </div>
  );
}
