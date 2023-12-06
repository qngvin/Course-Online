import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import schemaQuizzes from "../../../../../YupGlobal/schemaYup/inforQuizzesYup";
import { useFieldArray, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuizz,
  isCancelQuizzForm,
  updateQuizz,
} from "../../../../../store/slices/curriculumSlice/quizzSlice";
import { DevTool } from "@hookform/devtools";
import QuestionList from "./Questions/QuestionList";

function QuizzCom({ showModalQuizz, setShowModalQuizz }) {
  const dispatch = useDispatch();
  const { sectionID, quizzForm, isUpdateQuizz } = useSelector(
    (state) => state.quizzReducer
  );

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaQuizzes),
    defaultValues: {
      id: quizzForm?.id || "",
      name: quizzForm?.name || "",
      timeTaken: quizzForm?.timeTaken || "",
      questions: quizzForm?.questions || [],
    },
  });
  const { errors } = formState;
  const handleCloseModal = () => {
    dispatch(isCancelQuizzForm());
    reset();
    setShowModalQuizz(false);
  };

  const onSubmit = (data) => {
    // console.log(data);
    if (isUpdateQuizz === true) {
      dispatch(updateQuizz({ data, sectionID }));
    } else {
      dispatch(createQuizz({ data, sectionID }));
    }
    setShowModalQuizz(false);
    reset();
  };
  useEffect(() => {
    reset({
      id: quizzForm?.id || "",
      name: quizzForm?.name || "",
      timeTaken: quizzForm?.timeTaken || "",
      questions: quizzForm?.questions || [],
    });
  }, [quizzForm]);
  return (
    <>
      <>
        {showModalQuizz ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-[90%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">New Quiz</h3>
                    <button
                      className="p-1 ml-auto t border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={handleCloseModal}
                    >
                      <span className=" text-red-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="py-6 px-4 overflow-y-auto max-h-[80vh]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Quiz Name:
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <div className="text-left  text-red-500">
                        {errors.name?.message}
                      </div>

                      <label
                        htmlFor="timeTaken"
                        className="block mt-4 text-sm font-medium text-gray-600"
                      >
                        Time Taken:
                      </label>
                      <input
                        id="timeTaken"
                        type="number"
                        {...register("timeTaken")}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <div className="text-left  text-red-500">
                        {errors.timeTaken?.message}
                      </div>

                      <div className="mt-4 border border-t border-black">
                        <QuestionList
                          quizzForm={quizzForm}
                          {...{
                            control,
                            register,

                            getValues,
                            setValue,
                            errors,
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-4 py-2 px-3 !bg-blue-500 hover:!bg-blue-400 text-white rounded-md"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 !bg-black"></div>
          </>
        ) : null}
      </>

      {/* <DevTool control={control} /> */}
    </>
  );
}

export default QuizzCom;
