import yup from "../YupGlobal";

const schemaLesson = yup.object().shape({
  nameLesson: yup.string().required("required"),
  contentLesson: yup.string().required("required"),
  overviewLesson: yup.string().required("required"),
  videoLesson: yup.string().url("Invalid URL format").required("required"),
  learningTime: yup.number().min(1).max(120).required("required"),
});

export default schemaLesson;
