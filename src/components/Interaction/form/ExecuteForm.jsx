"use client";
import TextArea from "../inputs/Textarea";
import CustomButton from "../inputs/CustomButton";
import { useState, useContext } from "react";
import { QueryResultsContext } from "@/components/context/QueryResultsContext";
import { alertService } from "@/services/alertService";
import { useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
import TableWithRegisteredRadioBtns from "@/components/bootstrap/TableWithRegisteredRadioBtns";
import { dbConnectService } from "@/services/dbConnectService";
import { queryFilter } from "@/hooks/queryFilter";
const ExecuteForm = ({ connections }) => {
  const [numTextAreas, setNumTextAreas] = useState(["queryToExecute"]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(
    authSchema({ queryToExecute: true, dbconnectid: true })
  );
  const { setRowData } = useContext(QueryResultsContext);

  const {
    register,
    handleSubmit,
    formState,
    watch,
    reset,
    unregister,
    setError,
  } = useForm(schema);
  const { errors } = formState;

  async function onSubmit(data) {
    // Ensure somewhat valid queries are being sent from frontend (at least starting valid syntax)
    let result = queryFilter(data);
    if (result !== null) {
      alertService.error(result);
      return;
    }
    setLoading(true);
    await dbConnectService
      .executeCustomQueries(data)
      .then((res) => {
        const messageStack = [];
        res.forEach((result) => {
          if (Array.isArray(result)) {
            setRowData(result);
            messageStack.push(`${result.length} rows returned. Data can be viewed on the view panel.`)
          } else {
            messageStack.push(result);
          }
        });
        if (messageStack.length > 0) {
          alertService.success(messageStack.join(" ~ "));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alertService.error(err);
        setLoading(false);
      });
  }

  return (
    <section className="p-2">
      <p>NOTE: One query per textarea.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {numTextAreas.map((textAreaName, index) => {
          return (
            <span key={index}>
              <TextArea
                register={register}
                errors={errors}
                className="mb-2"
                label={textAreaName}
              />
            </span>
          );
        })}
        <TableWithRegisteredRadioBtns
          tableData={connections}
          register={register}
          registerName="dbConnectId"
          errors={errors}
          tableHeader="Select Database Connection"
        />
        <CustomButton
          onSubmit={() => {
            const newTextAreaName = `queryToExecute${numTextAreas.length + 1}`;
            const newTextArr = [...numTextAreas, newTextAreaName];
            setNumTextAreas(newTextArr);
            setSchema(
              authSchema(
                newTextArr.reduce((obj, key) => {
                  return { ...obj, [key]: true };
                }, {})
              )
            );
          }}
          type="button"
          actionWord="Add Query"
          className="m-2"
          disabled={loading}
        />
        <CustomButton
          onSubmit={() => {
            const toUnregister = numTextAreas[numTextAreas.length - 1];
            unregister(toUnregister.toLowerCase());
            const newTextArr = numTextAreas.slice(0, numTextAreas.length - 1);
            setNumTextAreas(newTextArr);
            setSchema(
              authSchema(
                newTextArr.reduce((obj, key) => {
                  return { ...obj, [key]: true };
                }, {})
              )
            );
          }}
          type="button"
          actionWord="Remove Query"
          className="m-2"
          disabled={loading}
        />
        <br></br>
        <CustomButton
          isLoading={loading}
          type="submit"
          actionWord="Execute"
          className="m-2"
          disabled={loading}
        />
        <CustomButton
          type="button"
          onSubmit={() => {
            reset();
          }}
          actionWord="Reset"
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default ExecuteForm;
