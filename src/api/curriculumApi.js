import axiosClient from "./axiosClient";

const curriculumApi = {
  addSection(params, courseId) {
    const url = `/section?courseId=${courseId}`;
    return axiosClient.post(url, params);
  },
  editSection(params, id) {
    const url = `/section?id=${id}`;
    return axiosClient.put(url, params);
  },
  deleteSection(id) {
    const url = `/section?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
    });
  },
  addLesson(params, sectionId) {
    const url = `/lesson?sectionId=${sectionId}`;
    return axiosClient.post(url, params);
  },
  editLesson(params, id) {
    const url = `/lesson?id=${id}`;
    return axiosClient.put(url, params);
  },
  deleteLesson(id) {
    const url = `/lesson?id=${id}`;
    return axiosClient.delete(url);
  },
  addAssignment(params, sectionId) {
    const url = `/assignment?sectionId=${sectionId}`;
    return axiosClient.post(url, params);
  },
  editAssignment(params, id) {
    const url = `/assignment?id=${id}`;
    return axiosClient.put(url, params);
  },
  deleteAssignment(id) {
    const url = `/assignment?id=${id}`;
    return axiosClient.delete(url);
  },
  addQuizz(params) {
    const { data, sectionID } = params;
    const url = `/quiz?sectionId=${sectionID}`;
    return axiosClient.post(url, data);
  },
  editQuizzes(params, id) {
    const url = `/quiz/update-quiz-and-create-question?QuizId=${id}`;
    return axiosClient.put(url, params);
  },
  deleteQuizzes(id) {
    const url = `/quiz/${id}`;
    return axiosClient.delete(url);
  },
  getQuizzesDetail(id) {
    const url = `/quiz/get-detail-by-id/${id}`;
    return axiosClient.get(url);
  },
  deleteQuestion(quizId, questionId) {
    const url = `/quiz/delete-question/${quizId}/${questionId}`;
    return axiosClient.delete(url);
  },
};

export default curriculumApi;
