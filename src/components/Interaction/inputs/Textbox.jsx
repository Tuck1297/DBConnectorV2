// inputType = Password, Text, Email
import { useState } from "react";
const TextBox = ({
  inputType = "text",
  className = "",
  placeholder = "",
  label = "",
  disabled = false,
  register = () => {},
  input = undefined,
  errors = {},
  onChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setInputValue(e.target.value);
  },
}) => {
  // const [inputValue, setInputValue] = useState(input);
  return (
    <section className="mb-3 form-floating">
      <input
        value={input}
        onChange={(e) => {
          // console.log(e.target.value);
        }}
        type={inputType}
        className={`form-control ${className} ${
          errors?.[label.replace(" ", "_").toLowerCase()] ? "is-invalid" : ""
        }`}
        placeholder={placeholder}
        id={`${label.replace(" ", "_").toLowerCase()}Input`}
        disabled={disabled}
        role="textbox"
        {...register(label.replace(" ", "_").toLowerCase())}
      ></input>
      <label htmlFor={`${label.replace(" ", "_").toLowerCase()}Input`}>
        {label}
      </label>
      <div className="invalid-feedback">
        {errors?.[label.replace(" ", "_").toLowerCase()]?.message}
      </div>
    </section>
  );
};

export default TextBox;
