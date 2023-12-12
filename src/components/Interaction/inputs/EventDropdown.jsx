import { useState } from "react";

const EventDropdown = ({
  externalEvent = () => {},
  register = () => {},
  errors = {},
  elements,
  initial,
  title,
  disable,
}) => {
  const [val, setVal] = useState(initial);
  return (
    <div className="mb-3">
      <select
        id="dropdown"
        className={`form-select ${errors?.dropdown ? "is-invalid" : ""}`}
        {...register("dropdown")}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          externalEvent(e.target.value);
        }}
        disabled={disable}
        style={{ height: "3.5rem" }}
        role="combobox"
      >
        {elements.map((element, index) => (
          <option
            value={element}
            key={index}
            // disabled={element != "postgres"}
          >
            {element}
            {/* {element != "postgres" ? " ~ Not Available" : ""} */}
          </option>
        ))}
      </select>
    </div>
  );
};
export default EventDropdown;
