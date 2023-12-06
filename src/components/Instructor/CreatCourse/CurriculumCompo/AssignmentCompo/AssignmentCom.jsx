import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextEditCurri from "../TextEditCurri";
import schemaAssignment from "../../../../../YupGlobal/schemaYup/inforAssigntmentYup";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssignment,
  isCancelFormAssign,
  updateAssignment,
} from "../../../../../store/slices/curriculumSlice/assignmentSlice";
function AssignmentCom({ showModalAssignment, setShowModalAssignment }) {
  const { assignmentForm, sectionID, isUpdateAssign1 } = useSelector(
    (state) => state.assignmentReducer
  );
  const dispatch = useDispatch();
  const { handleSubmit, control, register, formState, reset } = useForm({
    resolver: yupResolver(schemaAssignment),
    defaultValues: {
      id: assignmentForm?.id,
      titleAssign: assignmentForm.titleAssign,
      desAssign: assignmentForm.desAssign,
      timeTakenAssign: assignmentForm.timeTakenAssign,
    },
  });
  const { errors } = formState;
  const handleOnsubmitAssignment = (data) => {
    const newValues = { ...data, sectionID };
    if (isUpdateAssign1 === true) {
      dispatch(updateAssignment(newValues));
    } else {
      dispatch(createAssignment(newValues));
    }
    setShowModalAssignment(false);
  };
  const handeCancelAssignment = () => {
    dispatch(isCancelFormAssign());
    setShowModalAssignment(false);
  };
  useEffect(() => {
    reset({
      id: assignmentForm?.id,
      titleAssign: assignmentForm.titleAssign,
      desAssign: assignmentForm.desAssign,
      timeTakenAssign: assignmentForm.timeTakenAssign,
    });
  }, [assignmentForm]);
  return (
    <>
      {showModalAssignment ? (
        <>
          <div className=" justify-center items-center overflow-y-auto fixed inset-0 z-50 ">
            <form
              className="relative md:w-[50%] sm: w-[90%] mx-auto md:mt-10 sm: mt-20"
              onSubmit={handleSubmit(handleOnsubmitAssignment)}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-4">
                <div className="mt-3">
                  <p className="font-bold">Title</p>
                  <input
                    name="titleAssign"
                    {...register("titleAssign")}
                    placeholder="Title ............"
                    type="text"
                    className="w-full border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <div className="text-left  text-red-500">
                    {errors.titleAssign?.message}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Description Assignment</p>
                  <Controller
                    name="desAssign"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextEditCurri onChange={onChange} value={value} />
                    )}
                  />
                  <div className="text-left  text-red-500">
                    {errors.desAssign?.message}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-bold">Time Taken</p>
                  <input
                    name="timeTakenAssign"
                    {...register("timeTakenAssign")}
                    placeholder="Time..."
                    type="text"
                    className="w-1/6 sm: w-[30%] border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <label htmlFor="" className=" ml-2">
                    Minutes
                  </label>
                  <div className="text-left  text-red-500">
                    {errors.timeTakenAssign?.message}
                  </div>
                </div>
                <div className="flex items-center justify-end pt-5 rounded-b">
                  <button
                    className="!bg-red-500 text-white background-transparent font-bold uppercase  px-4 py-3 text-sm mr-2 rounded-lg"
                    type="button"
                    onClick={handeCancelAssignment}
                  >
                    Cancel
                  </button>
                  <button
                    className="!bg-emerald-500 text-white font-bold uppercase text-sm px-3 py-3 rounded-lg shadow hover:shadow-lg  "
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AssignmentCom;
