import yup from "../YupGlobal";

const schemaAssignment = yup.object().shape({
  titleAssign: yup.string().required("required"),
  desAssign: yup.string().required("required"),
  timeTakenAssign: yup.number().min(1).max(120).required("required"),
});

export default schemaAssignment;
