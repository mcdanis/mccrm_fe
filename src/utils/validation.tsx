export const ContactValidation = (formData: object) => {
  if (formData.status >= 4 && formData.status <= 8) {
    if (
      !formData.budget ||
      !formData.authority ||
      !formData.need ||
      !formData.time ||
      !formData.nextStep ||
      !formData.spesificationProject
    ) {
      return {
        error: true,
        message: "Please fill all field at Qualification tab",
      };
    }
  }

  if (formData.status >= 5 && formData.status <= 8) {
    if (
      !formData.projectName ||
      !formData.projectStartdate ||
      !formData.projectEnddate ||
      !formData.deal ||
      !formData.resultOfNegotiation
    ) {
      return {
        error: true,
        message: "Please fill all field at Negotiation tab",
      };
    }
  }

  if (formData.status == 8) {
    if (
      !formData.dealDone ||
      !formData.evaluation ||
      !formData.feedback ||
      !formData.documentation
    ) {
      return {
        error: true,
        message: "Please fill all field at Done tab",
      };
    }
  }

  return {
    error: false,
    message: "success",
  };
};
