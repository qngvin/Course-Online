import React from "react";
import { useFieldArray } from "react-hook-form";

function OptionList({ nestIndex, control, register, quizzForm, errors }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  return (
    <div>
      {fields &&
        fields.map((option, optionIndex) => (
          <div key={option.id} className="mt-2">
            <label
              htmlFor={`questions[${nestIndex}].options[${optionIndex}].optionText`}
              className="block text-sm font-medium text-gray-600"
            >
              Option Text:
            </label>
            <input
              {...register(
                `questions[${nestIndex}].options[${optionIndex}].optionText`
              )}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="text-left  text-red-500">
              {
                errors.questions?.[nestIndex]?.options?.[optionIndex]
                  ?.optionText?.message
              }
            </div>
            <label
              htmlFor={`questions[${nestIndex}].options[${optionIndex}].iscorrect`}
              className="block mt-2 text-sm font-medium text-gray-600"
            >
              Is Correct:
            </label>
            <input
              type="checkbox"
              {...register(
                `questions[${nestIndex}].options[${optionIndex}].iscorrect`
              )}
              className="mt-1 p-2 w-4 h-4 text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="text-left  text-red-500">
              {errors.options && <p>{errors.options.iscorrect.message}</p>}
            </div>
            <button
              className="block !bg-red-500 text-white py-2 px-3 rounded-md"
              type="button"
              onClick={() => remove(optionIndex)}
            >
              Delete Option {optionIndex + 1}
            </button>
          </div>
        ))}
      <button
        type="button"
        className="mt-2 block !bg-green-500 text-white py-2 px-3 rounded-md"
        onClick={() =>
          append({
            optionText: "",
            iscorrect: false,
          })
        }
      >
        Add Option
      </button>
    </div>
  );
}

export default OptionList;
