"use client";
import { alertService } from "@/services/alertService";
import { useEffect } from "react";

const Button = () => {
  function onSubmit() {
    alertService.warning("Warning Message...");
  }
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          onSubmit();
        }}
      >
        Button
      </button>
    </>
  );
};

export default Button;