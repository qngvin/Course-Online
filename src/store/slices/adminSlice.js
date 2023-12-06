import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import adminApi from "../../api/adminApi";
import courseApi from "../../api/courseApi";
import userApi from "../../api/userApi";
import accountApi from "../../api/accountApi";
import { toast } from "react-toastify";
import { getCatalog } from "./courseSlice/courseSlice";
import { tr } from "date-fns/locale";
const initialState = {
  catalog: null,
  users: null,
  isFlag: false,
  totalStudents: null,
  totalInstructors: null,
  totalCourses: null,
  revenue: null,
  mostCourseLearners: [],
  leastCourseLearners: [],
};
export const getUsers = createAsyncThunk("admin/get_users", async () => {
  try {
    const res = await userApi.getUsers();
    return res.data._data;
  } catch (error) {
    throw error;
  }
});
export const registerInstructor = createAsyncThunk(
  "admin/register_instructor",
  async (instructorData, { rejectWithValue }) => {
    try {
      const response = await accountApi.registerInstructor(instructorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCoursesByCatalog = createAsyncThunk(
  "course/getCourseByCatalog",
  async ({ catalogIDs }) => {
    const CourseParams = {
      offset: 0,
      limit: 999,
      minPrice: 0,
      maxPrice: 9999,
      catalogIDs: catalogIDs,
      courseSort: 0,
    };
    try {
      const res = await courseApi.getCourses(CourseParams);
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);
export const updateActiveUser = createAsyncThunk(
  "admin/active_user",
  async (userData) => {
    try {
      const res = await userApi.active_user(userData);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const createCatalog = createAsyncThunk(
  "catalog/createCatalog",
  async (catalogData) => {
    try {
      const response = await adminApi.create_catalog(catalogData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateCatalog = createAsyncThunk(
  "catalog/updateCatalog",
  async (catalogData) => {
    try {
      const response = await adminApi.update_catalog(catalogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCatalog = createAsyncThunk(
  "catalog/deleteCatalog",
  async (catalogId) => {
    try {
      const response = await adminApi.delete_catalog(catalogId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalStudents = createAsyncThunk(
  "admin/getTotalStudents",
  async (year) => {
    try {
      const response = await adminApi.total_student(year);
      return response.data._data;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalInstructors = createAsyncThunk(
  "admin/getTotalInstructors",
  async (year) => {
    try {
      const response = await adminApi.total_instructors(year);
      return response.data._data;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalCourses = createAsyncThunk(
  "admin/getTotalCourses",
  async (year) => {
    try {
      const response = await adminApi.total_courses(year);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalEarning = createAsyncThunk(
  "admin/getTotalEarning",
  async (year) => {
    try {
      const response = await adminApi.total_revenue(year);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getMostCourseLearner = createAsyncThunk(
  "admin/least_learners_course",
  async () => {
    try {
      const response = await adminApi.most_learners_courses();
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
);
export const getLeastCourseLearner = createAsyncThunk(
  "admin/most_learners_course",
  async () => {
    try {
      const response = await adminApi.least_learners_courses();
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTotalEarning.fulfilled, (state, action) => {
      return { ...state, revenue: action.payload, isFlag: false };
    });
    builder.addCase(getTotalEarning.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getTotalStudents.fulfilled, (state, action) => {
      return { ...state, totalStudents: action.payload, isFlag: false };
    });
    builder.addCase(getTotalStudents.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getTotalInstructors.fulfilled, (state, action) => {
      return { ...state, totalInstructors: action.payload, isFlag: false };
    });
    builder.addCase(getTotalInstructors.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getTotalCourses.fulfilled, (state, action) => {
      return { ...state, totalCourses: action.payload, isFlag: false };
    });
    builder.addCase(getTotalCourses.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getMostCourseLearner.fulfilled, (state, action) => {
      return { ...state, mostCourseLearners: action.payload, isFlag: false };
    });
    builder.addCase(getMostCourseLearner.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getLeastCourseLearner.fulfilled, (state, action) => {
      return { ...state, leastCourseLearners: action.payload, isFlag: false };
    });
    builder.addCase(getLeastCourseLearner.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(deleteCatalog.fulfilled, (state, action) => {
      // console.log(action.payload);
      return { ...state, isFlag: true };
    });
    builder.addCase(deleteCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCatalog.fulfilled, (state, action) => {
      return { ...state, catalog: action.payload, isFlag: false };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload, isFlag: false };
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(registerInstructor.fulfilled, (state, action) => {
      toast.success("Register Successfully!!!");
      return { ...state, isFlag: true };
    });
    builder.addCase(registerInstructor.rejected, (state, action) => {
      toast.error(action.payload._message[0]);
      return { ...state, error: action.payload };
    });
    builder.addCase(updateActiveUser.fulfilled, (state, action) => {
      return { ...state, isFlag: true };
    });
    builder.addCase(updateActiveUser.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createCatalog.fulfilled, (state, action) => {
      // console.log(action.payload);
      return { ...state, catalog: [...state.catalog, action.payload._data] };
    });
    builder.addCase(createCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updateCatalog.fulfilled, (state, action) => {
      return { ...state, isFlag: true };
    });
    builder.addCase(updateCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export const { deleteCatalogItem } = adminSlice.actions;

export default adminSlice.reducer;
