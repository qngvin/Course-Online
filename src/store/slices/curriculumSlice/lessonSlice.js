import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import curriculumApi from "../../../api/curriculumApi";
import courseApi from "../../../api/courseApi";

export const createLesson = createAsyncThunk(
  "lesson/add-lesson",
  async (data) => {
    const {
      nameLesson,
      contentLesson,
      overviewLesson,
      videoLesson,
      learningTime,
      sectionID,
    } = data;
    const lessonCreate = {
      name: nameLesson,
      overview: overviewLesson,
      content: contentLesson,
      videoUrl: videoLesson,
      learningTime: learningTime,
    };

    try {
      const res = await curriculumApi.addLesson(lessonCreate, sectionID);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/update-lesson",
  async (data) => {
    const {
      nameLesson,
      contentLesson,
      overviewLesson,
      videoLesson,
      learningTime,
      id,
    } = data;
    const lessonUpdate = {
      name: nameLesson,
      overview: overviewLesson,
      content: contentLesson,
      videoUrl: videoLesson,
      learningTime: learningTime,
    };
    try {
      const res = await curriculumApi.editLesson(lessonUpdate, id);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lesson/delete-lesson",
  async (id) => {
    try {
      const res = await curriculumApi.deleteLesson(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  lessonForm: {
    id: "",
    nameLesson: "",
    contentLesson: "",
    overviewLesson: "",
    videoLesson: "",
    learningTime: "",
  },
  sectionID: "",
  isSeclectLesson: null,
  error: "",
  isUpdateLesson1: false,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    isLessonFormFull: (state, action) => {
      return {
        ...state,
        lessonForm: {
          nameLesson: action.payload.nameLesson,
          contentLesson: action.payload.contentLesson,
          overviewLesson: action.payload.overviewLesson,
          videoLesson: action.payload.videoLesson,
          learningTime: action.payload.learningTime,
        },
      };
    },
    isSectionSelect: (state, action) => {
      return {
        ...state,
        sectionID: action.payload,
      };
    },
    isCancelFormLesson: (state, action) => {
      return {
        ...state,
        lessonForm: {
          nameLesson: "",
          contentLesson: "",
          overviewLesson: "",
          videoLesson: "",
          learningTime: "",
        },
      };
    },
    setIsSelectLesson: (state, action) => {
      return { ...state, isSeclectLesson: action.payload };
    },
    isLessonUpdate: (state, action) => {
      return {
        ...state,
        lessonForm: {
          id: action.payload.id,
          nameLesson: action.payload.name,
          contentLesson: action.payload.content,
          overviewLesson: action.payload.overview,
          videoLesson: action.payload.videoUrl,
          learningTime: action.payload.learningTime,
        },
      };
    },
    isUpdateLesson: (state, action) => {
      return { ...state, isUpdateLesson1: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createLesson.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        lessonForm: {
          nameLesson: "",
          contentLesson: "",
          overviewLesson: "",
          videoLesson: "",
          learningTime: "",
        },
      };
    });
    builder.addCase(updateLesson.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        lessonForm: {
          nameLesson: "",
          contentLesson: "",
          overviewLesson: "",
          videoLesson: "",
          learningTime: "",
        },
      };
    });
  },
});

export const {
  isLessonFormFull,
  isSectionSelect,
  isCancelFormLesson,
  setIsSelectLesson,
  isLessonUpdate,
  isUpdateLesson,
} = lessonSlice.actions;

export default lessonSlice.reducer;
