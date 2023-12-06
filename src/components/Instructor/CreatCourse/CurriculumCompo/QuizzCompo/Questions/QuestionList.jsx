import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import OptionList from "./OptionList";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion } from "../../../../../../store/slices/curriculumSlice/quizzSlice";
function QuestionList({
  control,
  register,
  setValue,
  getValues,
  defaultValues,
  quizzForm,
  errors,
}) {
  const dispatch = useDispatch();
  const { fields, append, remove, insert, prepend } = useFieldArray({
    control,
    name: "questions",
    keyName: "key",
  });
  const deleteQues = (questionId) => {
    const quizId = quizzForm?.id;
    const params = { quizId, questionId };
    dispatch(deleteQuestion(params));
  };

  return (
    <div className="py-2 border-t border-black">
      {fields.map((question, questionIndex) => (
        <div key={question.id} className="mt-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">
            Questions {questionIndex + 1}
          </h3>
          <button
            type="button"
            className={` 
            !bg-red-500 text-white py-2 px-3 rounded-md mt-2 `}
            onClick={() => {
              deleteQues(question.questionID);
              remove(questionIndex);
            }}
          >
            Delete
          </button>
          <label
            htmlFor={`questions[${questionIndex}].questionName`}
            className="block text-sm font-medium text-gray-600"
          >
            Question Name:
          </label>
          <input
            {...register(`questions[${questionIndex}].questionName`)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="text-left  text-red-500">
            {errors.questions?.[questionIndex]?.questionName?.message}
          </div>

          <label
            htmlFor={`questions[${questionIndex}].isMuti`}
            className="block mt-2 text-sm font-medium text-gray-600"
          >
            Multiple Choice:
          </label>
          <input
            type="checkbox"
            {...register(`questions[${questionIndex}].isMuti`)}
            className="mt-1 p-2 w-4 h-4 text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="text-left  text-red-500">
            {errors.questions?.[questionIndex]?.isMuti?.message}
          </div>
          <div className="mt-2">
            <h4 className="text-md font-medium text-gray-800">Options</h4>
            <OptionList
              nestIndex={questionIndex}
              {...{ control, register, errors }}
            />
            {/* {question.options &&
              question.options.map((option, optionIndex) => (
                <div key={option.id} className="mt-2">
                  <label
                    htmlFor={`questions[${questionIndex}].options[${optionIndex}].optionText`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Option Text:
                  </label>
                  <input
                    {...register(
                      `questions[${questionIndex}].options[${optionIndex}].optionText`
                    )}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />

                  <label
                    htmlFor={`questions[${questionIndex}].options[${optionIndex}].iscorrect`}
                    className="block mt-2 text-sm font-medium text-gray-600"
                  >
                    Is Correct:
                  </label>
                  <input
                    type="checkbox"
                    {...register(
                      `questions[${questionIndex}].options[${optionIndex}].iscorrect`
                    )}
                    className="mt-1 p-2 w-4 h-4 text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              ))} */}
          </div>

          {/* <button
            type="button"
            onClick={() => addOption(questionIndex)}
            className="mt-2 p-2 !bg-blue-500 text-white rounded-md"
          >
            Add Option
          </button> */}

          {/* <button
            type="button"
            onClick={() => remove(questionIndex)}
            className="mt-2 ml-2 p-2 !bg-red-500 text-white rounded-md"
          >
            Remove Question
          </button> */}
        </div>
      ))}
      <button
        type="button"
        className="!bg-green-500 text-white py-2 px-3 rounded-md mt-2"
        onClick={() => {
          append({
            questionName: "",
            isMuti: false,
            options: [{ optionText: "", iscorrect: false }],
          });
        }}
      >
        Add Question
      </button>
    </div>
  );
}

export default QuestionList;
