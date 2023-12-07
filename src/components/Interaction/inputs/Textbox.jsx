// inputType = Password, Text, Email
const TextBox = ({
  inputType = "text",
  className = "",
  placeholder = "",
  label = "",
  disabled = false,
}) => {
  return (
    <section className="mb-3 form-floating">
      <input
        type={inputType}
        className={`form-control ${className}`}
        placeholder={placeholder}
        id={`${label.replace(" ", "_")}Input`}
        disabled={disabled}
      ></input>
      <label htmlFor={`${label.replace(" ", "_")}Input`}>{label}</label>
    </section>
  );
};

export default TextBox;
