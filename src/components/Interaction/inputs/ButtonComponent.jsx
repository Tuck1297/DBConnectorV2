"use client";
import { useState } from "react";
import SmallSpinner from "@/components/loading/SmallSpinner";

const Button = ({
  onSubmit = () => {},
  className = "",
  actionWord = "Button",
  type = "submit",
  isLoading = false,
  error,
  register
}) => {
  return (
    <>
      <button
        className={`pushable w-100 ${className}`}
        onClick={() => {
          onSubmit();
        }}
        type={type}
        disabled={isLoading}
      >
        <span className="shadow" style={{color: "$yellow-600"}}></span>
        <span className="edge"></span>
        <span className="front">
          {isLoading ? <SmallSpinner/> : actionWord}
        </span>
      </button>
    </>
  );
};

export default Button;
