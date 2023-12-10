"use client";
import Card from "@/components/bootstrap/Card";
import TextBox from "../inputs/Textbox";
import ButtonComponent from "../inputs/ButtonComponent";
import Dropdown from "../inputs/Dropdown";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import { useContext, useState } from "react";
import { ConnectionContext } from "@/components/context/ConnectionContext";
import { alertService } from "@/services/alertService";
import { authSchema } from "@/hooks/yupAuth";
import { useForm } from "react-hook-form";
const ConnectionForm = () => {
  const { dbConnection, setDBConnection } = useContext(ConnectionContext);
  const [successfulTestConnection, setSuccessfulTestConnection] =
    useState(false);
  const [successfulSaveConnection, setSuccessfulSaveConnection] =
    useState(false);

  const schema = authSchema({
    host: true,
    port: true,
    name: true,
    schema: true,
    user_id: true,
    password: true,
    confirm_password: true,
    dropdown: true,
  });

  const { register, handleSubmit, formState, watch, reset } = useForm(schema);
  const { errors } = formState;
  const allFields = watch();

  function onSubmit(data) {
    setDBConnection(data);
    alertService.success("Connection Information Saved");
    setSuccessfulSaveConnection(true);
    setSuccessfulTestConnection(true);
  }

  function testDatabaseConnection() {
    console.log(allFields);
    alertService.success("Connection Successful");
    setSuccessfulTestConnection(true);
  }

  function restart() {
    reset();
    setSuccessfulSaveConnection(false);
    setSuccessfulTestConnection(false);
  }

  return (
    <Card header="DB Connection Information" className="border-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-1">
          <Col>
            <TextBox register={register} errors={errors} label="Host"></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="User Id"
            ></TextBox>
            <TextBox register={register} errors={errors} label="Name"></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Schema"
              placeholder="public"
            ></TextBox>
          </Col>
          <Col>
            <TextBox register={register} errors={errors} label="Port"></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Password"
              type="password"
            ></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Confirm Password"
              type="password"
            ></TextBox>
            <Dropdown
              register={register}
              errors={errors}
              elements={["postgres", "mongodb", "sql server"]}
            ></Dropdown>
          </Col>

          <ButtonComponent
            actionWord="Submit"
            disabled={successfulSaveConnection}
          />
        </Row>
      </form>
      <ButtonComponent
        actionWord="Test Connection"
        onSubmit={() => {
          testDatabaseConnection();
        }}
        className="mt-3"
        disabled={successfulTestConnection}
      />
    </Card>
  );
};

export default ConnectionForm;
