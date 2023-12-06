import instructorReducer from "./slices/instructorSlice";
import courseReducer from "./slices/courseSlice/courseSlice";
import createCourseReducer from "./slices//courseSlice/createCourseSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import accountReducer from "./slices/accountSlice";
import adminReducer from "./slices/adminSlice";
import changePasswordReducer from "./slices/changePassSlice";
import curricullumReducer from "./slices/curriculumSlice/curriculumSlice";
import paymentReducer from "./slices/paymentSlice";
import lessonReducer from "./slices/curriculumSlice/lessonSlice";
import assignmentReducer from "./slices/curriculumSlice/assignmentSlice";
import quizzReducer from "./slices/curriculumSlice/quizzSlice";
import answerQuizz from "./slices/answerQuizz";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    instructorReducer,
    courseReducer,
    accountReducer,
    cartReducer: cartReducer,
    createCourseReducer: createCourseReducer,
    userReducer: userReducer,
    adminReducer: adminReducer,
    changePasswordReducer: changePasswordReducer,
    curricullumReducer: curricullumReducer,
    paymentReducer: paymentReducer,
    lessonReducer: lessonReducer,
    assignmentReducer: assignmentReducer,
    quizzReducer: quizzReducer,
    answerQuizzReducer: answerQuizz,
  },
});

export default store;
