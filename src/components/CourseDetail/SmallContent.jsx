import React, { useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
export default function SmallContent() {
  const { courseDetail } = useSelector((state) => state.courseReducer);
  return (
    <div className="lg:px-36 sm: px-4 lg:py-10 sm: py-6">
      <h1 className="lg:text-5xl sm: text-2xl lg:pb-8 sm: pb-2 lg:font-semibold sm: font-bold text-black">
        Description
      </h1>
      <p>{courseDetail?.description}</p>
      <h2 className="text-2xl pt-4 lg:mb-7 sm: mb-2 font-medium">
        What is Included
      </h2>
      <p dangerouslySetInnerHTML={{ __html: courseDetail?.outcome }} />
    </div>
  );
}
