import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import schemaLesson from "../../../../../YupGlobal/schemaYup/inforLessonYup";
import TextEditCurri from "../TextEditCurri";
import CurricuUrl from "../CurricuUrl";
import {
  createLesson,
  isCancelFormLesson,
  updateLesson,
} from "../../../../../store/slices/curriculumSlice/lessonSlice";

export default function LessonCom({ showModalLess, setShowModalLess }) {
  const { lessonForm, allLesson, sectionID, isUpdateLesson1 } = useSelector(
    (state) => state.lessonReducer
  );
  const dispatch = useDispatch();
  const { handleSubmit, control, register, formState, reset } = useForm({
    resolver: yupResolver(schemaLesson),
    defaultValues: {
      id: lessonForm?.id,
      nameLesson: lessonForm.nameLesson,
      contentLesson: lessonForm.contentLesson,
      overviewLesson: lessonForm.overviewLesson,
      videoLesson: lessonForm.videoLesson,
      learningTime: lessonForm.learningTime,
    },
  });
  const { errors } = formState;
  const handleOnsubmitLess = (data) => {
    const newValues = { ...data, sectionID };
    if (isUpdateLesson1 === true) {
      dispatch(updateLesson(newValues));
    } else {
      dispatch(createLesson(newValues));
    }
    setShowModalLess(false);
  };
  const handeCancelLesson = () => {
    dispatch(isCancelFormLesson());
    setShowModalLess(false);
  };
  useEffect(() => {
    reset({
      id: lessonForm?.id,
      nameLesson: lessonForm.nameLesson,
      contentLesson: lessonForm.contentLesson,
      overviewLesson: lessonForm.overviewLesson,
      videoLesson: lessonForm.videoLesson,
      learningTime: lessonForm.learningTime,
    });
  }, [lessonForm]);
  return (
    <>
      {showModalLess ? (
        <>
          <div className=" justify-center items-center overflow-y-auto fixed inset-0 z-50 ">
            <form
              className="relative md:w-[50%] sm: w-[90%] mx-auto mt-10"
              onSubmit={handleSubmit(handleOnsubmitLess)}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-4">
                <div className="mt-3">
                  <p className="font-bold">Name Lesson</p>
                  <input
                    name="nameLesson"
                    {...register("nameLesson")}
                    placeholder="Name ............"
                    type="text"
                    className="w-full border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <div className="text-left  text-red-500">
                    {errors.nameLesson?.message}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Description Lesson</p>
                  <Controller
                    name="contentLesson"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextEditCurri onChange={onChange} value={value} />
                    )}
                  />
                  <div className="text-left  text-red-500">
                    {errors.contentLesson?.message}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Overview</p>
                  <input
                    name="overviewLesson"
                    {...register("overviewLesson")}
                    placeholder="Overview"
                    type="text"
                    className="w-full border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <div className="text-left  text-red-500">
                    {errors.overviewLesson?.message}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold mb-2">Video</p>
                  <Controller
                    name="videoLesson"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CurricuUrl onChange={onChange} value={value} />
                    )}
                  />
                  <div className="text-left  text-red-500">
                    {errors.videoLesson?.message}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold">Learning time</p>
                  <input
                    name="learningTime"
                    {...register("learningTime")}
                    placeholder="Time..."
                    type="text"
                    className="w-1/6 border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <label htmlFor="" className=" ml-2">
                    Minutes
                  </label>
                  <div className="text-left  text-red-500">
                    {errors.learningTime?.message}
                  </div>
                </div>
                <div className="flex items-center justify-end pt-5 rounded-b">
                  <button
                    className="!bg-red-500 text-white background-transparent font-bold uppercase  px-4 py-3 text-sm mr-2 rounded-lg"
                    type="button"
                    onClick={handeCancelLesson}
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
