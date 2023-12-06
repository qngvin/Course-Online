import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  isUpdateSec,
  isUpdateSection,
  setIsSelectedd,
} from "../../../../../store/slices/curriculumSlice/curriculumSlice";
import { toast } from "react-toastify";
import {
  faBars,
  faPenToSquare,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Lesson from "../LessonCompo/Lesson";
import {
  isSectionSelect,
  isUpdateLesson,
} from "../../../../../store/slices/curriculumSlice/lessonSlice";
import Assignment from "../AssignmentCompo/Assignment";
import { isSectionSelect2 } from "../../../../../store/slices/curriculumSlice/assignmentSlice";
import {
  isSectionSelect3,
  isUpdateQuizz1,
} from "../../../../../store/slices/curriculumSlice/quizzSlice";
import Quizzes from "../QuizzCompo/Quizzes";

function Section({
  section,
  sectionIndex,
  showModal,
  setShowModal,
  showModalLess,
  setShowModalLess,
  showModalAssignment,
  setShowModalAssignment,
  showModalQuizz,
  setShowModalQuizz,
}) {
  const { sectionForm, courseID, courseSec } = useSelector(
    (state) => state.curricullumReducer
  );
  const { allLesson, sectionID } = useSelector((state) => state.lessonReducer);
  const dispatch = useDispatch();
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");
  const handeAddNewLesson = (section) => {
    setShowModalLess(true);
    dispatch(isSectionSelect(section));
    dispatch(isUpdateLesson(false));
  };
  const handleDeleteSection = (id) => {
    // console.log(id);
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(setIsSelectedd(id));
      dispatch(deleteSection(id));
      deleteSuccessNotify();
    }
  };

  const handleUpdateSection = (section) => {
    setShowModal(true);
    dispatch(isUpdateSection(section));
    dispatch(isUpdateSec(true));
  };

  const handeAddNewAssign = (section) => {
    setShowModalAssignment(true);
    dispatch(isSectionSelect2(section));
  };
  const handeAddNewQuizzes = (section) => {
    setShowModalQuizz(true);
    dispatch(isSectionSelect3(section.id));
    dispatch(isUpdateSection(section));
    dispatch(isUpdateQuizz1(false));
    // console.log(section);
  };

  return (
    <>
      <div
        className={`flex flex-col w-full ${
          sectionIndex === 0 ? "mt-0" : "mt-4"
        } `}
        key={sectionIndex}
      >
        <div
          className={`flex justify-between gap-4 items-center w-full px-4  pb-[0.5rem]  ${
            sectionIndex === 0
              ? " border-b border-solid border-gray_2 pt-1"
              : "pt-[0.5rem] border-solid border-gray_2 border-b border-t"
          } `}
        >
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon className="text-[20px]" icon={faBars} />
            <p className="bg-[#e3e0e0] px-[10px] py-[2px] text-[14px] text-[#525151] rounded-[5px]">
              {section.name}
            </p>
          </div>
          <div className="flex item-center gap-4">
            <button className=" justify-end">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-blue-600"
                onClick={() => handleUpdateSection(section)}
              />
            </button>
            <button
              className=" justify-end"
              onClick={() => handleDeleteSection(section.id)}
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-600" />
            </button>
          </div>
        </div>
        <div className="bg-black flex gap-4 py-2 px-4">
          <button
            className="text-white"
            onClick={() => {
              handeAddNewLesson(section.id);
            }}
          >
            <FontAwesomeIcon className="pr-2" icon={faSquarePlus} />
            Add Lesson
          </button>
          <button
            className="text-white"
            onClick={() => {
              handeAddNewAssign(section.id);
            }}
          >
            <FontAwesomeIcon className="pr-2" icon={faSquarePlus} />
            Assignment
          </button>
          <button
            className="text-white"
            onClick={() => {
              handeAddNewQuizzes(section);
            }}
          >
            <FontAwesomeIcon className="pr-2" icon={faSquarePlus} />
            Quizzes
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-2 ">
          {section &&
            section?.lessons?.map((lesson, lessonIndex) => (
              <Lesson
                lesson={lesson}
                key={lessonIndex}
                lessonIndex={lessonIndex}
                showModalLess={showModalLess}
                setShowModalLess={setShowModalLess}
              />
            ))}
        </div>
        <div className="flex flex-col gap-4 mt-3 pt-3 border-t border-solid border-black">
          {section &&
            section?.assignments?.map((assignment, assignmentsIndex) => (
              <Assignment
                assignment={assignment}
                key={assignmentsIndex}
                assignmentsIndex={assignmentsIndex}
                showModalAssignment={showModalAssignment}
                setShowModalAssignment={setShowModalAssignment}
              />
            ))}
        </div>
        <div className="flex flex-col gap-4 mt-3 pt-3 border-t border-solid border-black">
          {section &&
            section?.quizzes?.map((quizzes, quizzesIndex) => (
              <Quizzes
                quizzes={quizzes}
                section={section}
                key={quizzesIndex}
                quizzesIndex={quizzesIndex}
                showModalQuizz={showModalQuizz}
                setShowModalQuizz={setShowModalQuizz}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Section;
