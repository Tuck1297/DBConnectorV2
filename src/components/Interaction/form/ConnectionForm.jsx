"use client";
import Card from "@/components/bootstrap/Card";
import TextBox from "../inputs/Textbox";
import CustomButton from "../inputs/CustomButton";
import Dropdown from "../inputs/Dropdown";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import { useContext, useState } from "react";
import { ConnectionContext } from "@/components/context/ConnectionContext";
import { alertService } from "@/services/alertService";
import { authSchema } from "@/hooks/yupAuth";
import { useForm } from "react-hook-form";
import { dbConnectService } from "@/services/dbConnectService";
import { connectService } from "@/services/connectService";
import LargeSpinner from "@/components/loading/LargeSpinner";
const ConnectionForm = ({ setPanel }) => {
  const { dbConnection, setDBConnection } = useContext(ConnectionContext);
  const [successfulTestConnection, setSuccessfulTestConnection] =
    useState(false);
  const [successfulSaveConnection, setSuccessfulSaveConnection] =
    useState(false);
  const [loadingMsg, setLoadingMsg] = useState(null);

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
    setSuccessfulSaveConnection(true);
    setLoadingMsg("Testing Connection Information");
    dbConnectService
      .testConnection(data)
      .then((res) => {
        // setLoadingMsg("Connection Successful");
        setLoadingMsg("Saving Connection Information");
        return connectService.create(data);
      })
      .then((res) => {
        setSuccessfulSaveConnection(true);
        alertService.success("Connection Information Saved");
        setDBConnection(data);
        setLoadingMsg(null);
        // setPanel("view");
      })
      .catch((err) => {
        // console.log(err)
        alertService.error("Connection Information Failed to Save");
        setSuccessfulSaveConnection(false);
      });
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
            <TextBox
              register={register}
              errors={errors}
              label="Port"
              inputType="number"
            ></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Password"
              inputType="password"
            ></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Confirm Password"
              inputType="password"
            ></TextBox>
            <Dropdown
              register={register}
              errors={errors}
              elements={["postgres", "mongodb", "sql server"]}
            ></Dropdown>
          </Col>
        </Row>
        {loadingMsg ? (
          <section className="d-flex">
            <LargeSpinner />
            <p className="fs-4 ps-4">{loadingMsg}</p>
          </section>
        ) : (
          ""
        )}
        <p>
          NOTE: Connection to external database will be tested prior to
          credentials being stored.
        </p>
        <CustomButton
          type="submit"
          actionWord="Submit"
          disabled={successfulSaveConnection}
          className="me-2 mt-3"
        />
        <CustomButton
          type="button"
          actionWord="Reset"
          onSubmit={() => {
            restart();
          }}
          className="mt-3"
        />
      </form>
    </Card>
  );
};

export default ConnectionForm;
