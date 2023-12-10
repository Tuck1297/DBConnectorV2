"use client";
import { useState } from "react";
import SmallSpinner from "@/components/loading/SmallSpinner";

const ButtonComponent = ({
  onSubmit = () => {},
  className = "",
  actionWord = "Button",
  type = "submit",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <>
      <button
        className={`pushable btn btn-primary w-100 ${className}`}
        onClick={() => {
          onSubmit();
        }}
        type={type}
        disabled={isLoading || disabled}
      >
        {/* <span className="shadow" style={{color: "$yellow-600"}}></span>
        <span className="edge"></span>
        <span className="front"> */}
          {isLoading ? <SmallSpinner/> : actionWord}
        {/* </span> */}
      </button>
    </>
  );
};

export default ButtonComponent;
