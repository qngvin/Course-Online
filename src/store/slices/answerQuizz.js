import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseApi from "../../api/courseApi";

const initialState = {
  answer: null,
  score: 0,
};

export const submitQuizz = createAsyncThunk(
  "user/submitQuizz",
  async (formAnswer) => {
    try {
      const response = await courseApi.submitQuizz(formAnswer);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getScoreQuizz = createAsyncThunk(
  "user/get_score_quizz",
  async ({ quizzId, userId }) => {
    const CourseParams = {
      quizId: quizzId,
      userId: userId,
    };
    try {
      const res = await courseApi.getScoreQuizz(CourseParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
const answerQuizz = createSlice({
  name: "quizz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitQuizz.fulfilled, (state, action) => {
      return { ...state, answer: action.payload };
    });
    builder.addCase(submitQuizz.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(getScoreQuizz.fulfilled, (state, action) => {
      return { ...state, score: action.payload.score };
    });
    builder.addCase(getScoreQuizz.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
        score: 0,
      };
    });
  },
});

export default answerQuizz.reducer;
