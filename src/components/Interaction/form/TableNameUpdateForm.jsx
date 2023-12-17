"use client";
import { forwardRef, useImperativeHandle, useState, useEffect, memo } from "react";
import TextBox from "../inputs/Textbox";

const TableNameUpdateForm = forwardRef((props, ref) => {
  const [table, setTable] = useState(props.table);

  useEffect(() => {
    setTable(props.table);
  }, [props.table]);

  useImperativeHandle(ref, () => ({
    getNewTableName() {
      return table;
    },
  }));

  return (
    <>
    <p className="text-center fs-5">Current Table Name is: {props.table}</p>
      <TextBox
        label="Table Name"
        input={table}
        onChange={(e) => {
          setTable(e.target.value);
        }}
      />
    </>
  );
});
export default memo(TableNameUpdateForm);
