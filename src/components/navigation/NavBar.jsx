"use client";
import NextLink from "./NextLink";
import DatabaseIcon from "../icons/Database";
import ListIcon from "../icons/List";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
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
            <ListIcon size={30} color="white" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 text-center" id="mainNavbar">
              <li className="nav-item">
                <NextLink className="nav-link text-white" path="/">
                  Home
                </NextLink>
              </li>

              {!session ? (
                <li className="nav-item">
                  <button
                    className="nav-link text-white text-center w-100"
                    onClick={() => signIn()}
                  >
                    Signin
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NextLink className="nav-link text-white" path="/db">
                      Database
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link text-white text-center w-100"
                      onClick={() => signOut()}
                    >
                      Signout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
