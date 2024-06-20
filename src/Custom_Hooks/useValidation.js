import { useEffect, useState } from "react";

const useValidation = (initialState) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialState);

  const validateForm = (data) => {
    let validationErrors = {};
    if (!data.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
    }
    if (!data.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!data.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(data.phoneNumber)) {
      validationErrors.phoneNumber = "Phone Number is invalid";
    }
    if (
      (data.position === "Developer" || data.position === "Designer") &&
      Number(data.experience) <= 0
    ) {
      validationErrors.experience =
        "Relevant Experience must be a number greater than 0";
    }
    if (
      data.position === "Designer" &&
      (!data.portfolioUrl.trim() ||
        !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(data.portfolioUrl))
    ) {
      validationErrors.portfolioUrl = "Portfolio URL is invalid";
    }
    if (data.position === "Manager" && !data.managementExperience.trim()) {
      validationErrors.managementExperience =
        "Management Experience is required";
    }
    if (!data.skills.length) {
      validationErrors.skills = "At least one skill must be selected";
    }
    if (!data.interviewTime.trim()) {
      validationErrors.interviewTime = "Preferred Interview Time is required";
    }
    return validationErrors;
  };

  useEffect(() => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
  }, [formData]);

  return { errors, setErrors, formData, setFormData, validateForm };
};

export default useValidation;
