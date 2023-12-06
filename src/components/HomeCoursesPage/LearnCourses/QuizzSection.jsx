import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDetailQuizzById } from "../../../store/slices/userSlice";
import { Drawer } from "antd";
import FormQuizz from "./FormQuizz";
import { getScoreQuizz } from "../../../store/slices/answerQuizz";

export default function QuizzSection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const containerRef = useRef();
  const quizzCurrent = location.state?.quizz;
  const { quizz, profile } = useSelector((state) => state.userReducer);
  const { score } = useSelector((state) => state.answerQuizzReducer);
  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} h ${remainingMinutes} mins`;
  }
  const formattedLearningTime =
    quizz?.timeTaken > 60
      ? convertMinutesToHours(quizz?.timeTaken)
      : `${quizz?.timeTaken} mins`;

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [multiChoiceValues, setMultiChoiceValues] = useState([]);
  const [countdown, setCountdown] = useState(quizzCurrent?.timeTaken * 60);
  const [open, setOpen] = useState(false);

  const showLargeDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedAnswers([]);
    setMultiChoiceValues([]);
    setCountdown(quizzCurrent?.timeTaken * 60);
  };

  useEffect(() => {
    dispatch(getDetailQuizzById(quizzCurrent.id));
    dispatch(getScoreQuizz({ quizzId: quizzCurrent?.id, userId: profile?.id }));
  }, [dispatch, quizzCurrent?.id]);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <h1 className="text-[30px] font-semibold">{quizz?.name}</h1>
      <div className="flex justify-end">
        <button
          onClick={showLargeDrawer}
          className={` px-6 py-2 rounded-[5px] ${
            score !== 0 ? "bg-gray-300" : "bg-blue-600"
          }   text-white`}
          disabled={score !== 0}
        >
          Start Quizz
        </button>
      </div>
      <div className="flex justify-between border-t border-gray_2 border-solid py-4">
        <div>
          <h1 className="font-semibold">Receive grade</h1>
          <p className="text-[#8c8c8c] text-[13px]">
            <span className="text-[#0000009e] font-semibold"> To pass</span> 80%
            or higher
          </p>
        </div>
        <div className="border-l border-gray_2 border-solid pl-4 pr-16">
          <h1 className="font-semibold">Your Grade: {score}</h1>
          <h1>Grade</h1>
        </div>
      </div>
      <Drawer
        title={
          <>
            {quizz?.name}
            <br />
            <div className=" relative flex items-center gap-5 text-[#707070] font-light text-[13px]">
              <p>Practice Quizz</p>
              <ul className="flex list-disc gap-5">
                <li>{formattedLearningTime}</li>
                <li>{quizz?.questions.length} question</li>
              </ul>
            </div>
          </>
        }
        placement="right"
        width="100%"
        height="100%"
        onClose={onClose}
        open={open}
        getContainer={containerRef.current}
      >
        <FormQuizz
          quizzCurrent={quizz}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          setMultiChoiceValues={setMultiChoiceValues}
          multiChoiceValues={multiChoiceValues}
          onClose={onClose}
          isOpen={open}
          countdown={countdown}
          setCountdown={setCountdown}
        />
      </Drawer>
    </div>
  );
}
