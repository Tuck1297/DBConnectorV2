"use client";
import TextBox from "../inputs/Textbox";
import Table from "@/components/tables/Table";
import { useEffect, useState, forwardRef, useImperativeHandle, memo } from "react";

const UpdateRowForm = forwardRef((props, _ref) => {
  const [rowState, setRowState] = useState(props.row);

  useEffect(() => {
    setRowState(props.row);
  }, [props.row]);

    useImperativeHandle(_ref, () => ({
        getRowState: () => {
            return rowState;
        }
    }));

  return (
    <>
      <Table
        data={Object.keys(rowState).map((column) => {
          return {
            Column: column,
            Value: (
              <TextBox
                input={rowState[column]}
                onChange={(e) => {
                  setRowState({
                      ...rowState,
                      [column]: e.target.value
                  });
                }}
              />
            ),
          };
        })}
      />
    </>
  );
});
export default memo(UpdateRowForm);
