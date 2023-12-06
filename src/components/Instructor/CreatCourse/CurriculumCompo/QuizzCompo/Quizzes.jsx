import {
  faFileLines,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteQuizz,
  getQuizzesDetail,
  isQuizzUpdate,
  isSectionSelect3,
  isUpdateQuizz1,
  setIsSelectQuizz,
} from "../../../../../store/slices/curriculumSlice/quizzSlice";
import {
  isCousedSelect,
  isUpdateSection,
  setIsSelectQuizz1,
} from "../../../../../store/slices/curriculumSlice/curriculumSlice";
import { useEffect } from "react";

function Quizzes({
  section,
  quizzes,
  quizzesIndex,
  showModalQuizz,
  setShowModalQuizz,
}) {
  const { courseID } = useSelector((state) => state.curricullumReducer);
  const { quizzForm } = useSelector((state) => state.quizzReducer);
  const dispatch = useDispatch();
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");
  const handleDeleteQuizz = (id) => {
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(isUpdateSection(section));
      dispatch(deleteQuizz(id));
      dispatch(setIsSelectQuizz(id));
      dispatch(setIsSelectQuizz1(id));
      deleteSuccessNotify();
    }
  };

  const handeleUpdateQuizz = (quizzes) => {
    dispatch(isUpdateSection(section));
    // console.log(section);
    dispatch(getQuizzesDetail(quizzes.id));
    setShowModalQuizz(true);
    dispatch(isUpdateQuizz1(true));
  };
  useEffect(() => {}, [dispatch]);
  return (
    <>
      <div
        className="flex justify-between items-center gap-2 px-6 font-medium"
        key={quizzes}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFileLines} />
          <p className="ml-2">
            Quizz {quizzesIndex + 1}: {quizzes.name}
          </p>
        </div>
        <div className="flex">
          <div className="">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer text-blue-600 "
              onClick={() => {
                handeleUpdateQuizz(quizzes);
              }}
            />
          </div>
          <div className="ml-2">
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-red-600"
              onClick={() => {
                handleDeleteQuizz(quizzes.id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizzes;
