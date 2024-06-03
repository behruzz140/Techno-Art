import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().min(4, "Email is valid.").required("Email is required"),
  password: Yup.string().min(6, "Require a minimum of 8 characters.").required("Password is required"),
});
export const signUpSchema = Yup.object().shape({
    email: Yup.string().min(4, "Email is valid.").required("Email is required"),
    first_name: Yup.string().required("Required"),
    phone_number: Yup.string().min(13).required("Required"),
    last_name: Yup.string().required("Required"),
    password: Yup.string().min(6, "Require a minimum of 8 characters.").required("Password is required"),
  });
  