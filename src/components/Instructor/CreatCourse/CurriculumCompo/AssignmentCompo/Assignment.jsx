import {
  faFileLines,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteAssignment,
  isAssignUpdate,
  isUpdateAssign,
  setIsSelectAssign,
} from "../../../../../store/slices/curriculumSlice/assignmentSlice";
import { setIsSelectAssign1 } from "../../../../../store/slices/curriculumSlice/curriculumSlice";
import { toast } from "react-toastify";

function Assignment({
  assignment,
  assignmentsIndex,
  showModalAssignment,
  setShowModalAssignment,
}) {
  const dispatch = useDispatch();
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");

  const handleDeleteAssign = (id) => {
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(deleteAssignment(id));
      dispatch(setIsSelectAssign(id));
      dispatch(setIsSelectAssign1(id));
      deleteSuccessNotify();
    }
  };
  const handleUpdateAssign = (assignment) => {
    // console.log(assignment);
    setShowModalAssignment(true);
    dispatch(isAssignUpdate(assignment));
    dispatch(isUpdateAssign(true));
  };
  return (
    <>
      <div
        className="flex justify-between items-center gap-2 px-6 font-medium"
        key={assignment}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFileLines} />
          <p className="ml-2">
            Assignment {assignmentsIndex + 1}: {assignment.title}
          </p>
        </div>
        <div className="flex">
          <div className="">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer text-blue-600 "
              onClick={() => {
                handleUpdateAssign(assignment);
              }}
            />
          </div>
          <div className="ml-2">
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-red-600"
              onClick={() => {
                handleDeleteAssign(assignment.id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Assignment;
