"use client";
import { useEffect } from "react";

// CSS
import "../styles/globals.css";

const ImportsComponent = () => {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
      }, []);
  return;
};
export default ImportsComponent;
