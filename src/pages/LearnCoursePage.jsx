import React, { useEffect } from "react";
import SectionCourse from "../components/HomeCoursesPage/LearnCourses/SectionCourse";
import NoteCourse from "../components/HomeCoursesPage/LearnCourses/NoteCourse";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbStudying from "../common/BreadcrumbStudying";
import { AccordionDetails, AccordionSummary, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import { IoDocumentTextSharp } from "react-icons/io5";
import { getCourseDetail } from "../store/slices/userSlice";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "5px",
  border: "1px solid #dbdbdb ",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded ": {
    border: "2px solid #d3940085 ",
  },
}));

export default function LearnCoursePage() {
  const location = useLocation();
  const courseId = location.state?.courseid;
  const dispatch = useDispatch();

  const { yourCourse, courseDetail } = useSelector(
    (state) => state.userReducer
  );
  const courseCurrent = yourCourse?.list.find((course) => {
    return course.id === courseDetail?.id;
  });

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
  }, [dispatch]);

  return (
    <div className="py-[3%] px-[3%]">
      <BreadcrumbStudying />
      <div className=" w-full grid grid-cols-1 sm:grid-cols-8 gap-3 px-2 pt-4 ">
        <div className="sm:col-span-2 col-span-1 h-full">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="header"
              id="header-content"
            >
              <h1 className="font-medium flex items-center gap-3">
                <IoDocumentTextSharp className="text-[#d39400d4] text-[20px]" />{" "}
                Table of Content
              </h1>
            </AccordionSummary>
            <AccordionDetails>
              {courseDetail &&
                courseDetail.sections
                  .slice()
                  .sort((a, b) => a.no - b.no)
                  .map((section) => (
                    <SectionCourse
                      key={section?.id}
                      courseName={courseDetail?.name}
                      sectionDetail={section}
                    />
                  ))}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="sm:col-span-4 col-span-1">
          <Outlet />
        </div>
        <div className="sm:col-span-2 col-span-1  h-full ">
          <NoteCourse
            courseDetail={courseDetail}
            courseCurrent={courseCurrent}
          />
        </div>
      </div>
    </div>
  );
}
