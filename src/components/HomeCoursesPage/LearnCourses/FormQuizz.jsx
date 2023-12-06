import { Checkbox, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScoreQuizz, submitQuizz } from "../../../store/slices/answerQuizz";
export default function FormQuizz({
  quizzCurrent,
  selectedAnswers,
  setSelectedAnswers,
  setMultiChoiceValues,
  multiChoiceValues,
  onClose,
  isOpen,
  countdown,
  setCountdown,
}) {
  const dispatch = useDispatch();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { quizz,profile } = useSelector((state) => state.userReducer);
  //handle choice
  const handleInputChange = (questionID, value) => {
    const updatedAnswers = [...selectedAnswers];
    const index = updatedAnswers.findIndex(
      (answer) => answer.questionID === questionID
    );
    if (index !== -1) {
      if (quizzCurrent.questions[index]?.isMuti) {
        updatedAnswers[index] = { questionID, selectedOptions: value };
      } else {
        updatedAnswers[index] = { questionID, selectedOptions: [value] };
      }
    } else {
      if (quizzCurrent.questions[index]?.isMuti) {
        updatedAnswers.push({ questionID, selectedOptions: value });
      } else {
        updatedAnswers.push({ questionID, selectedOptions: [value] });
      }
    }
    setSelectedAnswers(updatedAnswers);
  };
  const handleMultiChoiceChange = (questionID, checkedValues) => {
    setMultiChoiceValues((prevValues) => ({
      ...prevValues,
      [questionID]: checkedValues,
    }));
    handleInputChange(questionID, checkedValues);
  };
  //handle submit
  const handleSubmit = () => {
    const formattedData = {
      quizID: quizzCurrent?.id,
      questionAnswer: selectedAnswers.map((answer) => ({
        questionID: answer.questionID,
        optionAnswers: answer.selectedOptions.map((optionID) => ({
          optionID: optionID,
        })),
      })),
    };
   
    dispatch(submitQuizz(formattedData));
    dispatch(getScoreQuizz({quizzId:quizzCurrent?.id,userId:profile?.id}))
    setSubmitted(true);
    onClose();
  };
  useEffect(() => {
    const atLeastOneOptionNotSelected = selectedAnswers.some(
      (answer) => answer.selectedOptions.length === 0
    );
    setIsSubmitDisabled(
      selectedAnswers.length !== quizzCurrent.questions.length ||
        atLeastOneOptionNotSelected
    );
  }, [selectedAnswers, quizzCurrent.questions]);
  //handle time
  useEffect(() => {
    if (isOpen) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0 && !submitted) {
        clearInterval(countdownInterval);
        handleSubmit();
      }

      return () => clearInterval(countdownInterval);
    }
  }, [countdown, submitted, handleSubmit, isOpen, quizzCurrent?.timeTaken]);
  return (
    <div className="px-[8%]">
      <div className="absolute right-[2%] top-[2%] text-[#525252] font-medium">
        {Math.floor(countdown / 60)}:{countdown % 60}
      </div>
      {quizzCurrent.questions?.map((question, index) => (
        <div className="pb-4" key={question?.questionID}>
          <p className="text-[19px]">
            <span className="font-bold">{index + 1}.</span>
        
            {question?.questionName}
            {question?.isMuti && (
            <span className="pl-11 text-[13px]">(MultiChoice)</span>
            )}
          </p>
          {question?.isMuti ? (
            <Checkbox.Group
              className="flex flex-col gap-6 py-4 text-[18px]"
              options={question?.options.map((option) => ({
                label: option.optionText,
                value: option.option_ID,
              }))}
              onChange={(checkedValues) =>
                handleMultiChoiceChange(
                  question?.questionID,
                  checkedValues || []
                )
              }
              value={multiChoiceValues[question?.questionID] || []}
            />
          ) : (
            <Radio.Group
              className="flex flex-col gap-6 py-4 text-[18px]"
              options={question?.options.map((option) => ({
                label: option.optionText,
                value: option.option_ID,
              }))}
              onChange={(e) =>
                handleInputChange(question?.questionID, e.target.value)
              }
              value={
                selectedAnswers.find(
                  (answer) => answer.questionID === question.questionID
                )?.selectedOptions[0] || null
              }
            />
          )}
        </div>
      ))}
      <button
        className={`px-8 text-[18px] py-2 text-white rounded-[5px] ${
          isSubmitDisabled ? "bg-gray-600" : "bg-blue-600 "
        }`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
}
