import { Modal, Rate } from "antd";
import React, { useState, useEffect } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { PiClockClockwiseBold } from "react-icons/pi";
import { IoPersonOutline, IoPlaySharp, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddToCartButton from "../AddToCartButton";
import ContentDetail from "./ContentDetail";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import "./style.css";
import { Link } from "react-router-dom";
export default function HeaderCourseDetail() {
  const { catalog } = useSelector((state) => state.courseReducer);
  const { courseDetail, courses } = useSelector((state) => state.courseReducer);
  const [instructor, setInstructor] = useState(null);
  const [courseInf, setCourseInf] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleIconClick = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  const handleCloseClick = () => {
    setIsPlayerVisible(false);
  };

  useEffect(() => {
    const findInstructorOfCourse = () => {
      const foundCourse = courses?.find(
        (course) => course.id === courseDetail?.id
      );
      return foundCourse;
    };
    const courseInfo = findInstructorOfCourse();
    setInstructor(courseInfo?.instructor);
    setCourseInf(courseInfo);
  }, [courseDetail, courses]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="z-20 relative lg:px-36 sm: px-2 py-10 flex flex-col items-center ">
      <div className="w-full text-[#ffffff70] flex items-center">
        <IoPersonOutline className="text-base cursor-pointer " />
        <p className="pl-1 text-base">
          {courseInf?.learnerQuantity} Learner Quantity
        </p>
      </div>
      <Rate
        className="text-base text-[#41efb2]"
        allowHalf
        value={courseDetail?.avgRate || "2"}
      />
      <p className="text-[#ccc7c7f7] lg:py-8 sm: py-2 text-center leading-relaxed w-[75%]  lg:text-4xl sm: text-3xl font-semibold">
        {courseDetail?.name}
      </p>
      <div className="flex lg:flex-col sm: flex-row items-center gap-4 py-8">
        <img
          src={instructor?.image}
          className="w-[50px] h-[50px] rounded-full "
        />
        <p className="text-[#bdbdbd] pb-4">
          By - {instructor?.lastName} {instructor?.firstName}
        </p>
        <h1 className="text-[#006ae6] font-medium text-[20px]">
          ${courseInf?.price}
        </h1>
      </div>
      <div className="flex lg:flex-row sm: flex-col justify-between items-center w-full ">
        <div className="flex items-center gap-4 lg:mb-0 sm: mb-3">
          <motion.div
            className="rounded-full cursor-pointer"
            animate={{
              opacity: 1,
              boxShadow: [
                "0 0 0 0 #a9a0a0",

                "0 0 0 0.8rem  rgba(160,151,151,0.2)",
              ],
              transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          >
            <IoPlaySharp
              onClick={handleIconClick}
              className="text-[#bdbdbd] text-[40px] rounded-full p-3 bg-[#4ca69a]"
            />
          </motion.div>
          <p className=" text-[#bdbdbd]"> Watch Introduce</p>
        </div>

        <div className="flex items-center relative lg:mb-0 sm: mb-3 text-[#ffffff70]">
          <PiClockClockwiseBold className="text-[18px]" />
          <p className="pl-1 text-[16px]">
            {courseInf?.totalTimeTaken || "12 hours"} Hours
          </p>
          <span className="px-4">/</span>
          <BsCameraVideo className="text-[18px]" />
          <p className="text-[16px] pl-2">
            {courseDetail?.sections.length} Sections
          </p>
        </div>
        {/* className="bg-[#006ae6] text-white px-6 py-4 rounded-[5px]" */}
        <div className="relative bg-[#006ae6] text-white px-6 py-4 rounded-[5px]">
          <AddToCartButton course={courseInf} />
        </div>
      </div>

      <Modal
        width={680}
        className="modal-video"
        footer={null}
        open={isPlayerVisible}
        onOk={handleCloseClick}
        onCancel={handleCloseClick}
      >
        <ReactPlayer
          url={courseDetail?.videoIntroduction}
          className="w-full"
          controls={true}
        />
      </Modal>
    </div>
  );
}
