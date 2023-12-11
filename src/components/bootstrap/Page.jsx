import Row from "./Row";
import Col from "./Col";
const Page = ({ children }) => {
  return (
    <Row>
      {children ? (
        <Col ColNumSize={12}>
          <section
            className="rounded-3 border border-3 w-100 bg-white"
            role="page-body"
          >
            {children}
          </section>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default Page;
