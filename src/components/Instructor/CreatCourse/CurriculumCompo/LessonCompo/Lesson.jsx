import {
  faFileLines,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteLesson,
  isLessonUpdate,
  isUpdateLesson,
  setIsSelectLesson,
} from "../../../../../store/slices/curriculumSlice/lessonSlice";
import { toast } from "react-toastify";
import { setIsSelectLesson1 } from "../../../../../store/slices/curriculumSlice/curriculumSlice";

function Lesson({ lesson, lessonIndex, showModalLess, setShowModalLess }) {
  const dispatch = useDispatch();
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");

  const handleDeleteLesson = (id) => {
    // console.log(id);
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(deleteLesson(id));
      dispatch(setIsSelectLesson(id));
      dispatch(setIsSelectLesson1(id));
      deleteSuccessNotify();
    }
  };

  const handleUpdateLesson = (lesson) => {
    // console.log(lesson);
    setShowModalLess(true);
    dispatch(isLessonUpdate(lesson));
    dispatch(isUpdateLesson(true));
  };
  return (
    <>
      <div
        className="flex justify-between items-center gap-2 px-6 font-medium"
        key={lesson}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFileLines} />
          <p className="ml-2">
            Lesson {lessonIndex + 1}: {lesson.name}
          </p>
        </div>
        <div className="flex">
          <div className="">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer text-blue-600 "
              onClick={() => {
                handleUpdateLesson(lesson);
              }}
            />
          </div>
          <div className="ml-2">
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-red-600"
              onClick={() => {
                handleDeleteLesson(lesson.id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;
