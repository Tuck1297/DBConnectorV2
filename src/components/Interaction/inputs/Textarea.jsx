const TextArea = ({
    placeholder = "SELECT * FROM table_name;",
  className = "",
  disabled = false,
  register = () => {},
  label = "",
  errors = {},
}) => {
  return (
    <>
      <textarea
        className={`form-control ${className} ${
          errors?.[label.replace(" ", "_").toLowerCase()] ? "is-invalid" : ""
        }`}
        id={`${label.replace(" ", "_").toLowerCase()}Input`}
        disabled={disabled}
        role="textarea"
        {...register(label.replace(" ", "_").toLowerCase())}
        style={{ height: "200px" }}
        placeholder={placeholder}
      ></textarea>
      <div className="invalid-feedback">
        {errors?.[label.replace(" ", "_").toLowerCase()]?.message}
      </div>
    </>
  );
};

export default TextArea;
