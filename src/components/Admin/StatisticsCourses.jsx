import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeastCourseLearner,
  getMostCourseLearner,
} from "../../store/slices/adminSlice";
import { Drawer, Rate } from "antd";
import ReusableCourse from "./ReusableCourse";
import {
  getCourseDetailById,
  getCourses,
} from "../../store/slices/courseSlice/courseSlice";
import ReactPlayer from "react-player";

export default function StatisticsCourses() {
  //declare
  const dispatch = useDispatch();
  const { mostCourseLearners, leastCourseLearners } = useSelector(
    (state) => state.adminReducer
  );
  const { courseDetail, courses } = useSelector((state) => state.courseReducer);
  const [switchAnalyze, setSwitchAnalyze] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  //handle
  const showDrawer = (courseId) => {
    dispatch(getCourseDetailById(courseId));
    const foundCourse = courses.find((course) => course.id === courseId);
    setSelectedCourse(foundCourse);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handlerButton = (value) => {
    setSwitchAnalyze(value);
  };

  useEffect(() => {
    // console.log(selectedCourse)
    dispatch(getMostCourseLearner());
    dispatch(getLeastCourseLearner());
    dispatch(getCourses({ limit: 999, catalogIDs: null, courseSort: 0 }));
  }, [dispatch]);

  return (
    <div className="col-span-5 p-4  ">
      <div className="flex justify-between items-center pb-4 ">
        <h1 className="text-[20px]  font-semibold">
          Analyze Student Preferences
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => handlerButton(true)}
            className={`border border-solid py-1 px-2 text-[12px] rounded-[20px] ${
              switchAnalyze
                ? "bg-[#61A3BA] text-white"
                : "bg-[#f3f3f3] text-black"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => handlerButton(false)}
            className={`border border-solid py-1 px-2 text-[12px] rounded-[20px] ${
              switchAnalyze
                ? "bg-[#f3f3f3] text-black"
                : "bg-[#61A3BA] text-white"
            }`}
          >
            Unpopular
          </button>
        </div>
      </div>
      {switchAnalyze
        ? mostCourseLearners &&
          mostCourseLearners.map((course, index) => (
            <ReusableCourse
              key={index}
              onClick={() => showDrawer(course.id)}
              course={course}
            />
          ))
        : leastCourseLearners &&
          leastCourseLearners.map((course, index) => (
            <ReusableCourse
              key={index}
              onClick={() => showDrawer(course.id)}
              course={course}
            />
          ))}
      <Drawer
        title="Course Details"
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={open}
      >
        {selectedCourse && (
          <div>
            <h1 className="text-[24px] font-semibold">
              {selectedCourse?.name}
            </h1>
            <p className="text-[#8f8989] text-[18px]">
              {selectedCourse?.instructor.lastName}{" "}
              {selectedCourse?.instructor.firstName}
            </p>
            <div className="pb-6">
              <span className="text-[#6f7427] text-[22px] font-semibold pr-8 ">
                $ {selectedCourse?.price}
              </span>
              <span className="text-[15px]">
                <Rate
                  className="text-base text-[#41efb2] pr-4"
                  allowHalf
                  value={selectedCourse?.avgRate || "0"}
                />
                {selectedCourse?.avgRate}
              </span>
            </div>
            <ReactPlayer
              url={selectedCourse?.videoIntroduction}
              width={"100%"}
              controls={true}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}
