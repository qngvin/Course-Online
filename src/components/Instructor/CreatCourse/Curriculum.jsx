import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import {
  createSection,
  deleteSection,
  getSection,
  isUpdateSec,
  isUpdateSection,
  setIsSelectedd,
} from "../../../store/slices/curriculumSlice/curriculumSlice";
import SectionCom from "./CurriculumCompo/SectionCompo/SectionCom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LessonCom from "./CurriculumCompo/LessonCompo/LessonCom";
import {
  getLesson,
  isSectionSelect,
} from "../../../store/slices/curriculumSlice/lessonSlice";
import Section from "./CurriculumCompo/SectionCompo/Section";
import AssignmentCom from "./CurriculumCompo/AssignmentCompo/AssignmentCom";
import QuizzCom from "./CurriculumCompo/QuizzCompo/QuizzCom";

const Curriculum = () => {
  const dispatch = useDispatch();
  const { sectionForm, courseID, courseSec, flag } = useSelector(
    (state) => state.curricullumReducer
  );
  const { allLesson, sectionID } = useSelector((state) => state.lessonReducer);
  const [showModal, setShowModal] = useState(false);
  const [showModalLess, setShowModalLess] = useState(false);
  const [showModalAssignment, setShowModalAssignment] = useState(false);
  const [showModalQuizz, setShowModalQuizz] = useState(false);
  const { courses, catalog } = useSelector((state) => state.courseReducer);

  useEffect(() => {
    dispatch(getSection(courseID));
  }, [flag]);
  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[20px]">Curriculum</h1>
      </div>
      {/* Add Section */}
      <div className="flex justify-end">
        <SectionCom showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div className="border border-solid w-full border-gray_2 py-1 my-2 rounded-[10px]">
        {courseSec &&
          courseSec?.map((section, sectionIndex) => (
            <Section
              section={section}
              sectionIndex={sectionIndex}
              key={sectionIndex}
              showModal={showModal}
              setShowModal={setShowModal}
              showModalLess={showModalLess}
              setShowModalLess={setShowModalLess}
              showModalAssignment={showModalAssignment}
              setShowModalAssignment={setShowModalAssignment}
              showModalQuizz={showModalQuizz}
              setShowModalQuizz={setShowModalQuizz}
            />
          ))}{" "}
      </div>
      <LessonCom
        showModalLess={showModalLess}
        setShowModalLess={setShowModalLess}
      />
      <AssignmentCom
        showModalAssignment={showModalAssignment}
        setShowModalAssignment={setShowModalAssignment}
      />
      <QuizzCom
        showModalQuizz={showModalQuizz}
        setShowModalQuizz={setShowModalQuizz}
      />
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Curriculum;
