import * as yup from "yup";

const BDNUM = /^\+?(88)?01[23456789][0-9]{8}\b/g;

const validationSchema = yup.object({
  service: yup.mixed().nullable().required("Service is required"),
  firstName: yup
    .string()
    .min(2, "Minimum 2 letter required")
    .max(50, "Maximum 50 letter required")
    .required("First Name is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),

  lastName: yup
    .string()
    .min(2, "Minimum 2 letter required")
    .max(50, "Maximum 50 letter required")
    .required("Last name is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  email: yup.string().email("Please enter a valid email address").required("Required field"),
  phone: yup.string().matches(BDNUM, "Enter valid BD Number").required("Required field"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must Contain 6 latter, 1 Uppercase, 1 Lowercase, 1 Number and 1 Symbol"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
    agreeCondition: yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});
export default validationSchema;
