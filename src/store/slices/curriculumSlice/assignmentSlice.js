import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import curriculumApi from "../../../api/curriculumApi";

export const createAssignment = createAsyncThunk(
  "assignment/add-assignment",
  async (data) => {
    const { titleAssign, desAssign, timeTakenAssign, sectionID } = data;
    const assignCreate = {
      title: titleAssign,
      description: desAssign,
      timeTaken: timeTakenAssign,
    };
    try {
      const res = await curriculumApi.addAssignment(assignCreate, sectionID);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAssignment = createAsyncThunk(
  "assignment/update-assignment",
  async (data) => {
    const { titleAssign, desAssign, timeTakenAssign, id } = data;
    const assignCreate = {
      title: titleAssign,
      description: desAssign,
      timeTaken: timeTakenAssign,
    };
    try {
      const res = await curriculumApi.editAssignment(assignCreate, id);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAssignment = createAsyncThunk(
  "assignment/delete-assignment",
  async (id) => {
    try {
      const res = await curriculumApi.deleteAssignment(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  assignmentForm: {
    id: "",
    titleAssign: "",
    desAssign: "",
    timeTakenAssign: "",
  },
  sectionID: "",
  error: "",
  isSeclectAssign: null,
  isUpdateAssign1: false,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    isAssignmentFormFull: (state, action) => {
      return {
        ...state,
        assignmentForm: {
          titleAssign: action.payload.titleAssign,
          desAssign: action.payload.desAssign,
          timeTakenAssign: action.payload.timeTakenAssign,
        },
      };
    },
    isSectionSelect2: (state, action) => {
      return {
        ...state,
        sectionID: action.payload,
      };
    },
    isCancelFormAssign: (state, action) => {
      return {
        ...state,
        assignmentForm: {
          titleAssign: "",
          desAssign: "",
          timeTakenAssign: "",
        },
      };
    },
    setIsSelectAssign: (state, action) => {
      return { ...state, isSeclectAssign: action.payload };
    },
    isAssignUpdate: (state, action) => {
      return {
        ...state,
        assignmentForm: {
          id: action.payload.id,
          titleAssign: action.payload.title,
          desAssign: action.payload.description,
          timeTakenAssign: action.payload.timeTaken,
        },
      };
    },
    isUpdateAssign: (state, action) => {
      return { ...state, isUpdateAssign1: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAssignment.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        assignmentForm: {
          titleAssign: "",
          desAssign: "",
          timeTakenAssign: "",
        },
      };
    });
    builder.addCase(updateAssignment.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        assignmentForm: {
          titleAssign: "",
          desAssign: "",
          timeTakenAssign: "",
        },
      };
    });
  },
});

export const {
  isAssignmentFormFull,
  isSectionSelect2,
  isCancelFormAssign,
  setIsSelectAssign,
  isUpdateAssign,
  isAssignUpdate,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
