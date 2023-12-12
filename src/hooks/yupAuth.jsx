import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const authSchema = (schemaToBuild, prevSchema = {}) => {
  const newSchema = { ...prevSchema };
  Object.keys(schemaToBuild).forEach((formInput) => {
    switch (formInput.toLowerCase()) {
      case "host":
        newSchema[formInput.toLowerCase()] = Yup.string().required("Host is required");
        break;
      case "port":
        newSchema[formInput.toLowerCase()] = Yup.number().required("Port is required");
        break;
      case "name":
        newSchema[formInput.toLowerCase()] = Yup.string().required(
          "Database name is required"
        );
        break;
      case "schema":
        newSchema[formInput.toLowerCase()] = Yup.string().required(
          "Schema is required. Public is default."
        );
        break;
      case "user_id":
        newSchema[formInput.toLowerCase()] = Yup.string().required("User Id is required");
        break;
      case "password":
        newSchema[formInput.toLowerCase()] = Yup.string().required("Password is required");
        break;
      case "confirm_password":
        newSchema[formInput.toLowerCase()] = Yup.string().required(
          "Confirmation of Password is required"
        ).oneOf([Yup.ref("password"), null], "Passwords must match");
        break;
      case "dropdown":
        newSchema[formInput.toLowerCase()] = Yup.string().required(
          "Database type is required"
        );
        break;
      default:
        newSchema[formInput.toLowerCase()] = Yup.string().required("This field is required");
        break;
    }
  });

  //   if (schemaToBuild.name) {
  //     newSchema.name = Yup.string().required("Full Name is required");
  //   }
  //   if (schemaToBuild.username) {
  //     newSchema.username = Yup.string().required("Username is required");
  //   }
  //   if (schemaToBuild.email) {
  //     newSchema.email = Yup.string()
  //       .email("Invalid email address")
  //       .test(
  //         "is-email",
  //         "Invalid email address",
  //         (value) =>
  //           !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  //       )
  //       .required("Email is required");
  //   }
  //   if (schemaToBuild.password) {
  //     newSchema.password = Yup.string()
  //       .required("Password is required")
  //       .min(6, "Password must be at least 6 characters")
  //       .matches(
  //         /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,}$/,
  //         "Password must contain at least 6 characters, including letters, numbers, and special characters (@, #, $, %, ^, &, !)"
  //       );
  //   }
  //   if (schemaToBuild.confirmPassword) {
  //     newSchema.confirmPassword = Yup.string()
  //       .required("Confirmation of Password is required")
  //       .min(6, "Password must be at least 6 characters")
  //       .oneOf([Yup.ref("password"), null], "Passwords must match");
  //   }
  //   if (schemaToBuild.message) {
  //     newSchema.message = Yup.string().required("Message is required");
  //   }

  return { resolver: yupResolver(Yup.object().shape(newSchema)) };
};
