import yup from "../YupGlobal";

const schemaQuizzes = yup.object().shape({
  name: yup.string().required("Name is required"),
  timeTaken: yup.number().min(1).max(120).required("required"),
  questions: yup.array().of(
    yup.object().shape({
      questionName: yup.string().required("Question name is required"),
      isMuti: yup.boolean(),
      options: yup
        .array()
        .of(
          yup.object().shape({
            optionText: yup.string().required("Option answer is required"),
            iscorrect: yup.boolean(),
          })
        )
        .test(
          "iscorrect",
          "At least one option must be marked as correct",
          (value, { createError, parent }) => {
            const hasAtLeastOneCorrect = value.filter(
              (option) => option.iscorrect === true
            );
            const isMulti = parent.isMuti === true;
            // console.log(hasAtLeastOneCorrect.length);
            if (!isMulti) {
              return (
                hasAtLeastOneCorrect.length === 1 ||
                createError({
                  message: "At least one option must be marked as correct",
                  path: "options.iscorrect",
                })
              );
            } else {
              return (
                hasAtLeastOneCorrect.length >= 2 ||
                createError({
                  message:
                    "At least two option must be marked as correct if multi",
                  path: "options.iscorrect",
                })
              );
            }
          }
        ),
    })
  ),
});

export default schemaQuizzes;
