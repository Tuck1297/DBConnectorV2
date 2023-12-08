"use client";
import Card from "@/components/bootstrap/Card";
import TextBox from "../inputs/Textbox";
import Button from "../inputs/ButtonComponent";
import Dropdown from "../inputs/Dropdown";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import { useContext } from "react";
import { ConnectionContext } from "@/components/context/ConnectionContext";
const ConnectionForm = () => {
  const { dbConnection, setDBConnection } = useContext(ConnectionContext);

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <Card header="DB Connection Information">
      <Row className="g-1">
        <Col>
          <TextBox label="Host"></TextBox>
          <TextBox label="User Id"></TextBox>
          <TextBox label="Name"></TextBox>
          <TextBox label="Schema" placeholder="public"></TextBox>
        </Col>
        <Col>
          <TextBox label="Port"></TextBox>
          <TextBox label="Password" type="password"></TextBox>
          <TextBox label="Confirm Password" type="password"></TextBox>
          <Dropdown elements={["postgres", "mongodb", "sql server"]}></Dropdown>
        </Col>
        <Button></Button>
      </Row>
    </Card>
  );
};

export default ConnectionForm;
