import Button from "@/components/Interaction/Button";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import CenterElement from "@/components/bootstrap/CenterElement";
import DatabaseIcon from "@/components/icons/Database";

export default function Home() {
  return (
    <>
      <Row className="body-height">
        <Col ColNumSize="1"></Col>
        <Col ColNumSize="10" className="body-height">
          <CenterElement className="flex-column">
            <DatabaseIcon color="white" size="100"></DatabaseIcon>
            <h1 className="pt-4 text-white">Simple Database Connector Tool</h1>
            <h2 className="text-white">Tucker Johnson</h2>
          </CenterElement>
        </Col>
        <Col ColNumSize="1"></Col>
      </Row>
    </>
  );
}
