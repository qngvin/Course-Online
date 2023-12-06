import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

export default function VideoCourse() {
  const { courseDetail } = useSelector((state) => state.userReducer);
  return (
    <div className="w-full mx-auto">
      <ReactPlayer width="100%"  url={courseDetail?.videoIntroduction} controls={true} />
      <div className=" px-2 py-2">
        <h1 className="font-semibold text-[20px]">Descripton</h1>
          <p className="text-[#797979] text-[14px]">{courseDetail?.description}</p>
      </div>
    </div>
  );
}
