import React, { useState } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Overview from "./Overview";
import InstructorNote from "./InstructorNote";

export default function NoteCourse({ courseCurrent, courseDetail }) {
  //declare
  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} h ${remainingMinutes} mins`;
  }
  const formattedLearningTime =
    courseCurrent?.totalTimeTaken > 60
      ? convertMinutesToHours(courseCurrent?.totalTimeTaken)
      : `${courseCurrent?.totalTimeTaken} mins`;

  const totalSection = courseDetail?.sections.length;
  const calculateTotalAssignment = () => {
    return courseDetail?.sections.reduce((totalCount, section) => {
      return (
        totalCount + (section?.assignments ? section?.assignments.length : 0)
      );
    }, 0);
  };
  const calculateTotaQuizz = () => {
    return courseDetail?.sections.reduce((totalCount, section) => {
      return (
        totalCount + (section?.quizzes ? section?.quizzes.length : 0)
      );
    }, 0);
  };

  const totalAssignmentCount = calculateTotalAssignment();
  const totalQuizzCount = calculateTotaQuizz();

  const [showForm, setShowForm] = useState(1);
  return (
    <>
      <div className="py-4 mb-6 bg-gray_5 rounded-[5px] border border-solid  border-[#D6D6D6]">
        <div className="px-4 py-2  flex justify-between items-center">
          <div className="flex items-center font-medium text-[15px] ">
            {" "}
            <FontAwesomeIcon
              className="text-[#DB6B04] text-[20px]  pr-[5px]"
              icon={faBook}
            />{" "}
            Sections:
          </div>

          <div className="text-[#707070] text-[15px]">{totalSection} section</div>
        </div>
        <div className="px-4 py-4  flex justify-between">
          <div className="flex items-center font-medium text-[15px] ">
            {" "}
            <FontAwesomeIcon
              className="text-[#DC0000] text-[20px] pr-[5px]"
              icon={faCalendarCheck}
            />
            Assignment:
          </div>
          <div className="text-[#707070] text-[15px]">
            {totalAssignmentCount} assignment
          </div>
        </div>
        <div className="px-4 py-4  flex justify-between">
          <div className="flex items-center font-medium text-[15px] ">
            {" "}
            <FontAwesomeIcon
              className="text-[#DC0000] text-[20px] pr-[5px]"
              icon={faCalendarCheck}
            />
            Quizz:
          </div>
          <div className="text-[#707070] text-[15px]">{totalQuizzCount} quizz</div>
        </div>
        <div className="px-4 py-2  flex justify-between">
          <div className="flex items-center font-medium text-[15px]">
            {" "}
            <FontAwesomeIcon
              className="text-[#DBC500] text-[20px] pr-[5px]"
              icon={faClock}
            />
            Total time:
          </div>
          <div className="text-[#707070] text-[15px]">
            {formattedLearningTime}
          </div>
        </div>
      </div>

      <div className="py-4 bg-gray_5 rounded-[5px]  border border-solid  border-[#D6D6D6]">
        <div className=" pb-4 px-4 flex justify-between  border-solid border-b border-[#D6D6D6] ">
          <div
            onClick={() => setShowForm(1)}
            className="cursor-pointer font-medium text-[15px]  "
          >
            <FontAwesomeIcon
              className=" text-[20px] pr-[5px]"
              icon={faFileAlt}
            />
            Overview
          </div>
          <div
            onClick={() => setShowForm(2)}
            className="cursor-pointer font-medium text-[15px]"
          >
            <FontAwesomeIcon
              className=" text-[20px] pr-[5px]"
              icon={faUserTie}
            />
            Instructor
          </div>
        </div>
        {showForm === 1 && <Overview courseDetail={courseDetail} />}
        {showForm === 2 && (
          <InstructorNote instructorDetail={courseCurrent[0]?.instructor} />
        )}
      </div>
    </>
  );
}
