import React from "react";
import useValidation from "./Custom_Hooks/useValidation";
import formImage from "./assets/formImage.png";

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  position: "",
  experience: "",
  portfolioUrl: "",
  managementExperience: "",
  skills: [],
  interviewTime: "",
};

function App() {
  const { errors, setErrors, formData, setFormData, validateForm } =
    useValidation(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          skills: [...prevState.skills, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          skills: prevState.skills.filter((skill) => skill !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:", formData);
      alert("Form submitted successfully! Check the console for the data.");
    }
  };

  return (
    <div className="p-8 flex justify-center m-auto bg-gradient-to-r from-stone-400 to-stone-600 rounded-md shadow-md h-auto ">
      <div>
        <img src={formImage} alt="" className="w-auto h-full " />
      </div>
      <div className="bg-white p-4">
        <h1 className="text-3xl font-bold text-center pb-4">
          Job Application Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap gap-4 mt-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="font-medium text-xl mr-2 font-sans"
            >
              Full Name:
            </label>
            <input
              className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {errors.fullName && (
              <span className="text-red-500">{errors.fullName}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-medium text-xl mr-2 font-sans"
            >
              Email:
            </label>
            <input
              className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="font-medium text-xl mr-2 font-sans"
            >
              Phone Number:
            </label>
            <input
              className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md "
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="position"
              className="font-medium text-xl mr-2 font-sans"
            >
              Applying for Position:
            </label>
            <select
              className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && (
              <span className="text-red-500">{errors.position}</span>
            )}
          </div>

          {(formData.position === "Developer" ||
            formData.position === "Designer") && (
            <div className="flex flex-col">
              <label
                htmlFor="experience"
                className="font-medium text-xl mr-2 font-sans"
              >
                Relevant Experience (Years):
              </label>
              <input
                className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
              {errors.experience && (
                <span className="text-red-500">{errors.experience}</span>
              )}
            </div>
          )}

          {formData.position === "Designer" && (
            <div className="flex flex-col">
              <label
                htmlFor="portfolioUrl"
                className="font-medium text-xl mr-2 font-sans"
              >
                Portfolio URL:
              </label>
              <input
                className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
                type="text"
                id="portfolioUrl"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                required
              />
              {errors.portfolioUrl && (
                <span className="text-red-500">{errors.portfolioUrl}</span>
              )}
            </div>
          )}

          {formData.position === "Manager" && (
            <div className="flex flex-col">
              <label
                htmlFor="managementExperience"
                className="font-medium text-xl mr-2 font-sans"
              >
                Management Experience:
              </label>
              <textarea
                className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
                id="managementExperience"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                required
              ></textarea>
              {errors.managementExperience && (
                <span className="text-red-500">
                  {errors.managementExperience}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col">
            <label className="font-medium text-xl mr-2 font-sans">
              Additional Skills:
            </label>
            <div className="flex flex-wrap gap-4 my-2">
              {["JavaScript", "CSS", "Python", "React", "Node.js"].map(
                (skill) => (
                  <div key={skill} className="flex items-center">
                    <input
                      className="mr-1"
                      type="checkbox"
                      id={skill}
                      name="skills"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleChange}
                    />
                    <label htmlFor={skill} className="font-sans">
                      {skill}
                    </label>
                  </div>
                )
              )}
            </div>
            {errors.skills && (
              <span className="text-red-500">{errors.skills}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="interviewTime"
              className="font-medium text-xl mr-2 font-sans"
            >
              Preferred Interview Time:
            </label>
            <input
              className="p-2 rounded-md border-none outline-none bg-gray-400 shadow-md"
              type="datetime-local"
              id="interviewTime"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
              required
            />
            {errors.interviewTime && (
              <span className="text-red-500">{errors.interviewTime}</span>
            )}
          </div>

          <button
            type="submit"
            className="hover:bg-emerald-400 bg-green-400 text-white text-xl p-2 rounded-md border-none shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
