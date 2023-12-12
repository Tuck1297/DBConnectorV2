"use client";
import TextArea from "../inputs/Textarea";
import CustomButton from "../inputs/CustomButton";
import { useState, useContext } from "react";
import { ConnectionContext } from "@/components/context/ConnectionContext";
import { alertService } from "@/services/alertService";
import { useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
const ExecuteForm = () => {
  const [numTextAreas, setNumTextAreas] = useState(["queryToExecute"]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(authSchema({ queryToExecute: true }));

  const { register, handleSubmit, formState, watch, reset, unregister } = useForm(schema);
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        <CustomButton type="button" onSubmit={() => {reset()}} actionWord="Reset" disabled={loading} />
      </form>
    </section>
  );
};

export default ExecuteForm;
