export const isFormValid = (formData) => {
  return Object.keys(formData)
    .map((key) => formData[key] !== "")
    .every((item) => item);
};
