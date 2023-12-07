"use client";
import NextLink from "./NextLink";
import DatabaseIcon from "../icons/Database";
import ListIcon from "../icons/List";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <NextLink className="navbar-brand" path="/">
            <DatabaseIcon />
          </NextLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <ListIcon size={30} color="white"/>
            {/* <span className="navbar-toggler-icon"></span> */}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 text-center" id="mainNavbar">
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/">
                  Home
                </NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/db">
                  Database Home
                </NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/db/craft">
                  Craft Query Studio
                </NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/db/execute">
                  Execute Query Studio
                </NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/db/view">
                    View Query Studio
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
