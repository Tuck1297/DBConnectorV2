import NextLink from "./NextLink";

const Sidebar = ({ children }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <button
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline nav-link">Menu</span>
              </button>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <button
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2"></i>
                    <span className="ms-1 d-none d-sm-inline text-white">
                      Panels
                    </span>
                  </button>
                  <ul
                    className="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">View Data</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">
                          Execute Query
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">Build Query</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle "
                  >
                    <i className="fs-4 bi-bootstrap"></i>
                    <span className="ms-1 d-none d-sm-inline text-white">
                      Docs
                    </span>
                  </button>
                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu2"
                    data-bs-parent="#menu"
                  >
                    <li className="w-100">
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">Postgres</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">SQL</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link px-0 ms-4 text-white"
                      >
                        <span className="d-none d-sm-inline">MongoDB</span>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col py-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
