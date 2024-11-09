export const isFormValid = (formData, formFields = null) => {
  const _formData = { ...formData };
  if (formFields) {
    formFields?.forEach((field) => {
      if (!field.isMandatory) {
        delete _formData[field.name];
      }
    });
  }
  return Object.keys(_formData)
    .map((key) => _formData[key] !== "")
    .every((item) => item);
};
