"use client";
import Card from "@/components/bootstrap/Card";
import TextBox from "../inputs/Textbox";
import CustomButton from "../inputs/CustomButton";
import Dropdown from "../inputs/Dropdown";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import { useState, useContext } from "react";
import { alertService } from "@/services/alertService";
import { authSchema } from "@/hooks/yupAuth";
import { useForm } from "react-hook-form";
import { dbConnectService } from "@/services/dbConnectService";
import { connectService } from "@/services/connectService";
import LargeSpinner from "@/components/loading/LargeSpinner";
import { ConnectionsContext } from "@/components/context/ConnectionsContext";
const ConnectionForm = ({ setPanel }) => {
  const { connectionsData, setConnectionsData } = useContext(ConnectionsContext);
  const [successfulSaveConnection, setSuccessfulSaveConnection] =
    useState(false);
  const [loadingMsg, setLoadingMsg] = useState(null);

  const schema = authSchema({
    host: true,
    port: true,
    database_name: true,
    // schema: true,
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
    // remove dropdown and update to database_type
    data.database_type = data.dropdown;
    const { dropdown, ...updatedData } = data;
    dbConnectService
      .testConnection(updatedData)
      .then((res) => {
        // setLoadingMsg("Connection Successful");
        setLoadingMsg("Saving Connection Information");
        return connectService.create(updatedData);
      })
      .then((res) => {
        setSuccessfulSaveConnection(true);
        alertService.success("Connection Information Saved");
        setLoadingMsg(null);
        setConnectionsData((prevState) => [...prevState, res]);
      })
      .catch((err) => {
        // console.log(err)
        alertService.error(err);
        setSuccessfulSaveConnection(false);
        setLoadingMsg(null);
      });
  }

  function restart() {
    reset();
    setSuccessfulSaveConnection(false);
    setLoadingMsg(null);
  }

  return (
    <Card header="Add a new DB Connection" className="border-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-1">
          <Col>
            <TextBox register={register} errors={errors} label="Host"></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Port"
              inputType="number"
            ></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="User Id"
            ></TextBox>
            <TextBox
              register={register}
              errors={errors}
              label="Database Name"
            ></TextBox>
            {/* <TextBox
              register={register}
              errors={errors}
              label="Schema"
              placeholder="public"
            ></TextBox> */}
          </Col>
          <Col>
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
          // onSubmit={() => {console.log(errors)}}
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
