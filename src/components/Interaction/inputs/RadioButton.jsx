const RadioButton = ({
  registerGroupName = "radioBtnGroup",
  value = "",
  register = () => {},
}) => (
  <input
    {...register(`${registerGroupName.replaceAll(" ", "_").toLowerCase()}`)}
    className="form-check-input"
    type="radio"
    name={`${registerGroupName.replaceAll(" ", "_").toLowerCase()}`}
    id={`${registerGroupName.replaceAll(" ", "_").toLowerCase()}${Math.random()}}`}
    value={value}
  />
);

export default RadioButton;
