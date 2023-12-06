import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import curriculumApi from "../../../api/curriculumApi";
import courseApi from "../../../api/courseApi";
import { createLesson, deleteLesson, updateLesson } from "./lessonSlice";
import {
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from "./assignmentSlice";
import { createQuizz, deleteQuizz, updateQuizz } from "./quizzSlice";

export const createSection = createAsyncThunk(
  "section/add-section",
  async (data) => {
    const { nameSection, descriptionSec, courseID } = data;
    const sectionCreate = {
      name: nameSection,
      description: descriptionSec,
    };

    try {
      const res = await curriculumApi.addSection(sectionCreate, courseID);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateSection = createAsyncThunk(
  "section/update-section",
  async (data) => {
    const { nameSection, descriptionSec, id } = data;
    const sectionUpdate = {
      name: nameSection,
      description: descriptionSec,
    };
    try {
      const res = await curriculumApi.editSection(sectionUpdate, id);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSection = createAsyncThunk(
  "section/delete-section",
  async (id) => {
    try {
      const res = await curriculumApi.deleteSection(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
);
export const getSection = createAsyncThunk(
  "course/my-courses/course-detail",
  async (courseID) => {
    try {
      const res = await courseApi.getMyCourseDetail(courseID);
      return res.data._data.sections;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  courseSec: null,
  sectionForm: {
    id: "",
    nameSection: "",
    descriptionSec: "",
  },
  isfillfull1: false,
  courseID: "",
  error: "",
  isUpdateSection1: false,
  isSelectedd: null,
  isSeclectLesson: null,
  isSeclectAssign: null,
  isSelectQuizz: null,
  flag: false,
};
const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    isFullingfull1: (state, action) => {
      return {
        ...state,
        sectionForm: {
          nameSection: action.payload.nameSection,
          descriptionSec: action.payload.descriptionSec,
        },
      };
    },
    isCousedSelect: (state, action) => {
      return {
        ...state,
        courseID: action.payload,
      };
    },
    isUpdateSection: (state, action) => {
      return {
        ...state,
        sectionForm: {
          id: action.payload.id,
          nameSection: action.payload.name,
          descriptionSec: action.payload.description,
        },
      };
    },
    isUpdateSec: (state, action) => {
      return { ...state, isUpdateSection1: action.payload };
    },
    setIsSelectedd: (state, action) => {
      return { ...state, isSelectedd: action.payload };
    },
    isCancelFormSec: (state, action) => {
      return {
        ...state,
        sectionForm: {
          nameSection: "",
          descriptionSec: "",
        },
      };
    },
    setIsSelectLesson1: (state, action) => {
      return { ...state, isSeclectLesson: action.payload };
    },
    setIsSelectAssign1: (state, action) => {
      return { ...state, isSeclectAssign: action.payload };
    },
    setIsSelectQuizz1: (state, action) => {
      return { ...state, isSelectQuizz: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSection.fulfilled, (state, action) => {
      return { ...state, courseSec: action.payload, error: "" };
    });
    builder.addCase(getSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createSection.fulfilled, (state, action) => {
      const { courseSec } = state;
      const newCourseSec = [...courseSec, action.payload];
      return {
        ...state,
        error: false,
        flag: true,
        sectionForm: {
          nameSection: "",
          descriptionSec: "",
        },
        courseSec: newCourseSec,
      };
    });
    builder.addCase(updateSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updateSection.fulfilled, (state, action) => {
      const { courseSec } = state;
      const { id, name, description } = action.payload;
      const isInCourseUpdate = courseSec.findIndex((item) => item.id === id);
      if (isInCourseUpdate !== -1) {
        const newCourseSec = [...courseSec];
        newCourseSec[isInCourseUpdate] = {
          ...newCourseSec[isInCourseUpdate],
          id,
          name: name,
          description: description,
        };
        return {
          ...state,
          error: false,
          sectionForm: {
            nameSection: "",
            descriptionSec: "",
          },
          courseSec: newCourseSec,
        };
      }
    });
    builder.addCase(deleteSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      const { courseSec, isSelectedd } = state;

      const newCourses = courseSec.filter(
        (section) => section.id !== isSelectedd
      );

      return { ...state, courseSec: newCourses, error: "" };
    });
    builder.addCase(createLesson.fulfilled, (state, action) => {
      const { courseSec } = state;
      const { sectionID } = action.payload;
      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );
      // console.log(isInCourseUpdate);
      if (isInCourseUpdate !== -1) {
        const newCourseSec = [...courseSec];
        newCourseSec[isInCourseUpdate] = {
          ...newCourseSec[isInCourseUpdate],

          lessons: [...newCourseSec[isInCourseUpdate].lessons, action.payload],
        };

        // console.log(newCourseSec[isInCourseUpdate]);

        return {
          ...state,
          error: false,
          courseSec: newCourseSec,
        };
      }
    });
    builder.addCase(createLesson.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(updateLesson.fulfilled, (state, action) => {
      const { courseSec } = state;

      const { id, sectionID, name, overview, content, videoUrl, learningTime } =
        action.payload;

      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );

      if (isInCourseUpdate !== -1) {
        const isInSectionUpdate = courseSec[isInCourseUpdate].lessons.findIndex(
          (item) => item.id === id
        );

        if (isInSectionUpdate !== -1) {
          const newCourseSec = [...courseSec];
          const newLessons = [...newCourseSec[isInCourseUpdate].lessons];
          // console.log(newCourseSec);

          newLessons[isInSectionUpdate] = {
            id,
            name: name,
            overview: overview,
            content: content,
            videoUrl: videoUrl,
            learningTime: learningTime,
          };

          newCourseSec[isInCourseUpdate] = {
            ...newCourseSec[isInCourseUpdate],

            lessons: newLessons,
          };
          return {
            ...state,
            error: false,
            courseSec: newCourseSec,
          };
        }
      }
    });
    builder.addCase(updateLesson.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(deleteLesson.fulfilled, (state, action) => {
      const { courseSec, isSeclectLesson } = state;
      const { sectionID } = action.payload.data;

      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );

      if (isInCourseUpdate !== -1) {
        const newLessons = courseSec[isInCourseUpdate].lessons?.filter(
          (lesson) => lesson.id !== isSeclectLesson
        );
        const newCoursesSec = [...courseSec];
        newCoursesSec[isInCourseUpdate] = {
          ...newCoursesSec[isInCourseUpdate],
          lessons: newLessons,
        };
        return { ...state, courseSec: newCoursesSec, error: "" };
      }
    });
    builder.addCase(deleteLesson.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(createAssignment.fulfilled, (state, action) => {
      const { courseSec } = state;
      const { sectionID } = action.payload;

      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );
      // console.log(isInCourseUpdate);
      if (isInCourseUpdate !== -1) {
        const newCourseSec = [...courseSec];
        newCourseSec[isInCourseUpdate] = {
          ...newCourseSec[isInCourseUpdate],

          assignments: [
            ...newCourseSec[isInCourseUpdate].assignments,
            action.payload,
          ],
        };

        // console.log(newCourseSec[isInCourseUpdate]);

        return {
          ...state,
          error: false,
          courseSec: newCourseSec,
        };
      }
    });
    builder.addCase(createAssignment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(updateAssignment.fulfilled, (state, action) => {
      const { courseSec } = state;

      const { id, sectionID, title, description, timeTaken } = action.payload;

      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );

      if (isInCourseUpdate !== -1) {
        const isInSectionUpdate = courseSec[
          isInCourseUpdate
        ].assignments.findIndex((item) => item.id === id);

        if (isInSectionUpdate !== -1) {
          const newCourseSec = [...courseSec];
          const newAssign = [...newCourseSec[isInCourseUpdate].assignments];
          // console.log(newCourseSec);

          newAssign[isInSectionUpdate] = {
            id,
            title: title,
            description: description,
            timeTaken: timeTaken,
          };

          newCourseSec[isInCourseUpdate] = {
            ...newCourseSec[isInCourseUpdate],

            assignments: newAssign,
          };
          return {
            ...state,
            error: false,
            courseSec: newCourseSec,
          };
        }
      }
    });
    builder.addCase(updateAssignment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(deleteAssignment.fulfilled, (state, action) => {
      const { courseSec, isSeclectAssign } = state;
      const { sectionID } = action.payload.data;

      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionID
      );

      if (isInCourseUpdate !== -1) {
        const newAssignments = courseSec[isInCourseUpdate].assignments?.filter(
          (lesson) => lesson.id !== isSeclectAssign
        );
        const newCoursesSec = [...courseSec];
        newCoursesSec[isInCourseUpdate] = {
          ...newCoursesSec[isInCourseUpdate],
          assignments: newAssignments,
        };
        return { ...state, courseSec: newCoursesSec, error: "" };
      }
    });
    builder.addCase(deleteAssignment.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(createQuizz.fulfilled, (state, action) => {
      const { courseSec, sectionForm } = state;
      // console.log(action);
      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionForm.id
      );
      if (isInCourseUpdate !== -1) {
        const newCourseSec = [...courseSec];
        newCourseSec[isInCourseUpdate] = {
          ...newCourseSec[isInCourseUpdate],

          quizzes: [...newCourseSec[isInCourseUpdate].quizzes, action.payload],
        };

        // console.log(newCourseSec[isInCourseUpdate]);

        return {
          ...state,
          error: false,
          courseSec: newCourseSec,
        };
      }
    });
    builder.addCase(createQuizz.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(updateQuizz.fulfilled, (state, action) => {
      const { courseSec, sectionForm } = state;
      const { id, timeTaken, name, questions } = action.meta.arg.data;
      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionForm.id
      );

      if (isInCourseUpdate !== -1) {
        const isInSectionUpdate = courseSec[isInCourseUpdate].quizzes.findIndex(
          (item) => item.id === id
        );
        if (isInSectionUpdate !== -1) {
          const newCourseSec = [...courseSec];
          const newQuizzes = [...newCourseSec[isInCourseUpdate].quizzes];

          newQuizzes[isInSectionUpdate] = {
            id: id,
            name: name,
            questions: questions,
            timeTaken: timeTaken,
          };

          newCourseSec[isInCourseUpdate] = {
            ...newCourseSec[isInCourseUpdate],

            quizzes: newQuizzes,
          };
          return {
            ...state,
            error: false,
            courseSec: newCourseSec,
          };
        }
      }
    });
    builder.addCase(updateQuizz.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
    builder.addCase(deleteQuizz.fulfilled, (state, action) => {
      const { courseSec, isSelectQuizz, sectionForm } = state;
      const isInCourseUpdate = courseSec.findIndex(
        (item) => item.id === sectionForm.id
      );
      if (isInCourseUpdate !== -1) {
        const newQuizz = courseSec[isInCourseUpdate].quizzes?.filter(
          (quizz) => quizz.id !== isSelectQuizz
        );
        const newCoursesSec = [...courseSec];
        newCoursesSec[isInCourseUpdate] = {
          ...newCoursesSec[isInCourseUpdate],
          quizzes: newQuizz,
        };
        return { ...state, courseSec: newCoursesSec, error: "" };
      }
    });
    builder.addCase(deleteQuizz.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
  },
});

export const {
  isFullingfull1,
  isCousedSelect,
  setIsSelectedd,
  isUpdateSection,
  isUpdateSec,
  isCancelFormSec,
  setIsSelectLesson1,
  setIsSelectAssign1,
  setIsSelectQuizz1,
} = curriculumSlice.actions;

export default curriculumSlice.reducer;
