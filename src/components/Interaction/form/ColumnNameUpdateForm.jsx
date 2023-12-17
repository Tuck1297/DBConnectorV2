"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  memo,
} from "react";
import TextBox from "../inputs/Textbox";

const ColumnNameUpdateForm = forwardRef((props, ref) => {
  const [column, setColumn] = useState(props.column.column_name);

  useEffect(() => {
    setColumn(props.column.column_name);
  }, [props.column]);

  useImperativeHandle(ref, () => ({
    getNewColumnName() {
      return column;
    },
  }));

  return (
    <>
      <p className="text-center fs-5">
        Current Column Name is: {props.column.column_name}
      </p>
      <TextBox
        label="Column Name"
        input={column}
        onChange={(e) => {
          setColumn(e.target.value);
        }}
      />
    </>
  );
});
export default memo(ColumnNameUpdateForm);
