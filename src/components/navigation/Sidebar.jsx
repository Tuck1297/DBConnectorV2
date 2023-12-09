import Row from "../bootstrap/Row";
import Col from "../bootstrap/Col";
import CollapseSidebarNav from "./CollapseSidebarNav";
import HouseIcon from "../icons/House";
import FilesIcon from "../icons/Files";
import DatabaseIcon from "../icons/Database";
import AsteriskIcon from "../icons/Asterisk";
import BracesAsteriskIcon from "../icons/BracesAsterisk";
import ViewStacked from "../icons/ViewStacked";
import GearWideConnect from "../icons/GearWideConnect";
import HashIcon from "../icons/Hash";
const Sidebar = ({ children, setPanel }) => {
  return (
    <>
      <div className="container-fluid">
        <Row className="flex-nowrap">
          <Col
            ColNumSize={0}
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <button
                onClick={() => {
                  setPanel("home");
                }}
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none nav-link"
              >
                <HouseIcon size={24} color="white" className="text-center"/>
                <span className="fs-5 d-none d-sm-inline ms-2">Menu</span>
              </button>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <CollapseSidebarNav
                mainIcon={<HashIcon size={24} color="white" />}
                subIcons={[
                    <ViewStacked size={24} color="white" />,
                    <AsteriskIcon size={24} color="white" />,
                    <BracesAsteriskIcon size={24} color="white" />,
                    <GearWideConnect size={24} color="white" />
                ]}
                  subMenuName="Database Ops"
                  navElements={["View", "Execute", "Build", "Connection"]}
                  setPanel={setPanel}
                ></CollapseSidebarNav>
                <CollapseSidebarNav
                  mainIcon={<FilesIcon size={24} color="white" />}
                  subIcons={[
                    <DatabaseIcon size={24} color="white" />,
                    <DatabaseIcon size={24} color="white" />,
                    <DatabaseIcon size={24} color="white" />
                  ]}
                  subMenuName="Docs"
                  navElements={["Postgres", "SQL", "MongoDB"]}
                  setPanel={setPanel}
                ></CollapseSidebarNav>
              </ul>
            </div>
          </Col>
          <div className="col py-3">{children}</div>
        </Row>
      </div>
    </>
  );
};

export default Sidebar;
