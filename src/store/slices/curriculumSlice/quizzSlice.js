import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import curriculumApi from "../../../api/curriculumApi";

export const createQuizz = createAsyncThunk(
  "quiz/add-quiz",
  async (dataForm) => {
    const { data, sectionID } = dataForm;

    try {
      const res = await curriculumApi.addQuizz({ data, sectionID });
      return res.data._data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateQuizz = createAsyncThunk(
  "quiz/edit-quiz",
  async (dataForm) => {
    const { data } = dataForm;
    const { id, name, timeTaken, questions } = data;
    const EditQuizzParams = { name, timeTaken, questions };
    try {
      const res = await curriculumApi.editQuizzes(EditQuizzParams, id);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteQuizz = createAsyncThunk("quiz/delete-quiz", async (id) => {
  try {
    const res = await curriculumApi.deleteQuizzes(id);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const deleteQuestion = createAsyncThunk(
  "quiz/delete-question",
  async (params) => {
    const { quizId, questionId } = params;
    try {
      const res = await curriculumApi.deleteQuestion(quizId, questionId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getQuizzesDetail = createAsyncThunk(
  "quiz/get_detail_quiz",
  async (id) => {
    try {
      const res = await curriculumApi.getQuizzesDetail(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  quizzForm: null,
  sectionID: "",
  error: "",
  isSelectQuizz: null,
  isUpdateQuizz: false,
};

const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    isQuizzFormFull: (state, action) => {
      return {
        ...state,
        quizzForm: action.payload,
      };
    },

    isUpdateQuizz1: (state, action) => {
      return {
        ...state,
        isUpdateQuizz: action.payload,
      };
    },
    isQuizzUpdate: (state, action) => {
      return {
        ...state,
        quizzForm: action.payload,
      };
    },
    isSectionSelect3: (state, action) => {
      return {
        ...state,
        sectionID: action.payload,
      };
    },
    isCancelQuizzForm: (state, action) => {
      return {
        ...state,
        quizzForm: null,
      };
    },
    setIsSelectQuizz: (state, action) => {
      return {
        ...state,
        isSelectQuizz: action.payload,
      };
    },

    setOption: (state, aciton) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizzesDetail.fulfilled, (state, action) => {
      return {
        ...state,
        quizzForm: action.payload,
        error: "",
      };
    });
    builder.addCase(updateQuizz.fulfilled, (state, action) => {
      return {
        ...state,
        quizzForm: null,
        error: "",
      };
    });
  },
});

export const {
  isQuizzFormFull,
  isSectionSelect3,
  setIsSelectQuizz,
  isUpdateQuizz1,
  isQuizzUpdate,
  isCancelQuizzForm,
} = quizzSlice.actions;

export default quizzSlice.reducer;
