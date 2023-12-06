import React from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

export default function ContentLesson() {
  const location = useLocation();
  const lessonCurrent = location.state?.lesson;
  return (
    <div className="w-full mx-auto">
      <ReactPlayer width="100%" url={lessonCurrent?.videoUrl} controls={true} />
      <div className=" px-2 py-2">
        <h1 className="font-semibold text-[20px]">Descripton</h1>

        <p dangerouslySetInnerHTML={{ __html: lessonCurrent?.content }} />
        <p>{lessonCurrent?.overview}</p>
      </div>
    </div>
  );
}
