import React, { useEffect, useState } from "react";

import { MdOutlineVideocam } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { MdOutlineEventNote } from "react-icons/md";
import { AccordionDetails, AccordionSummary, styled } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import { Link } from "react-router-dom";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "5px",
  border: "1px solid #b0b0b0c9 ",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded ": {
    backgroundColor: "#6f6f6f14",
    border: "none",
  },
}));
export default function SectionCourse({ courseName, sectionDetail }) {
  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} h ${remainingMinutes} mins`;
  }
  const totalLearningTime = sectionDetail.lessons.reduce(
    (acc, lesson) => acc + lesson.learningTime,
    0
  );
  const formattedLearningTime =
    totalLearningTime > 60
      ? convertMinutesToHours(totalLearningTime)
      : `${totalLearningTime} mins`;

  return (
    <div className="mb-2">
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Link
            to={{
              pathname: `/studyingcourse/${courseName?.replace(
                / /g,
                "-"
              )}/${sectionDetail?.name.replace(/ /g, "-")}`,
            }}
            state={{ section: sectionDetail }}
            className="flex justify-between w-full "
          >
            <h1 className="font-medium">
              {sectionDetail.no}. {sectionDetail.name}
            </h1>
            <p className="text-[#000000b0]">{formattedLearningTime}</p>
          </Link>
        </AccordionSummary>
        <AccordionDetails>
          {sectionDetail &&
            sectionDetail.lessons.map((lesson, index) => (
              <Link
                to={{
                  pathname: `/studyingcourse/${courseName?.replace(
                    / /g,
                    "-"
                  )}/${sectionDetail?.name.replace(
                    / /g,
                    "-"
                  )}/lesson/${lesson?.name.replace(/ /g, "-")}`,
                }}
                state={{ lesson: lesson }}
                key={index}
                className="flex items-start  pb-6 gap-1"
              >
                <MdOutlineVideocam className="border border-solid border-black text-black rounded-full text-[25px] p-1" />
                <p className="text-[#676767] ">
                  <span className="font-medium text-black">Video: </span>
                  {lesson.name}
                </p>
              </Link>
            ))}
          {sectionDetail &&
            sectionDetail.assignments.map((assignment, index) => (
              <Link
                to={{
                  pathname: `/studyingcourse/${courseName?.replace(
                    / /g,
                    "-"
                  )}/${sectionDetail?.name.replace(
                    / /g,
                    "-"
                  )}/assignment/${assignment?.title.replace(/ /g, "-")}`,
                }}
                state={{ assignment: assignment }}
                key={index}
                className="flex items-start  pb-6 gap-1"
              >
                <FontAwesomeIcon
                  icon={faComment}
                  className="border border-solid border-black text-black rounded-full text-[13px] p-1"
                />
                <p className="text-[#676767] ">
                  <span className="font-medium text-black">Assignment: </span>
                  {assignment.title}
                </p>
              </Link>
            ))}
          {sectionDetail &&
            sectionDetail.quizzes.map((quizz, index) => (
              <Link    to={{
                  pathname: `/studyingcourse/${courseName?.replace(
                    / /g,
                    "-"
                  )}/${sectionDetail?.name.replace(
                    / /g,
                    "-"
                  )}/quizz/${quizz?.name.replace(/ /g, "-")}`,
                }}
                state={{ quizz: quizz }} key={index} className="flex items-start  pb-6 gap-1">
                <MdOutlineEventNote className="border border-solid border-black text-black rounded-full text-[25px] p-1" />

                <p className="text-[#676767] ">
                  <span className="font-medium text-black">Quizz: </span>
                  {quizz.name}
                </p>
              </Link>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
