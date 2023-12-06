import axiosClient from "./axiosClient";

const adminApi = {
  create_catalog(params) {
    const url = "/Catalog/create";
    return axiosClient.post(url, params);
  },
  update_catalog(params) {
    const url = "/Catalog/update";
    return axiosClient.put(url, params);
  },
  delete_catalog(catalogId) {
    const url = `/Catalog/delete?ID=${catalogId}`;
    return axiosClient.delete(url);
  },
  most_learners_courses() {
    const url = `/Admin/most-learners-courses?quantity=5`;
    return axiosClient.get(url);
  },
  least_learners_courses() {
    const url = `/Admin/least-learners-courses?quantity=5`;
    return axiosClient.get(url);
  },
  total_revenue(year) {
    const url = `/Admin/total-earnings-for-year?year=${year}`;
    return axiosClient.get(url);
  },
  total_student(year) {
    const url = `/Admin/total-student?year=${year}`;
    return axiosClient.get(url);
  },
  total_instructors(year) {
    const url = `/Admin/total-Instructors?year=${year}`;
    return axiosClient.get(url);
  },
  total_courses(year) {
    const url = `/Admin/course-stats-for-year?year=${year}`;
    return axiosClient.get(url);
  },
};
export default adminApi;
