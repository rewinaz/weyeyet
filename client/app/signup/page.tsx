"use client";

import FormTextInput from "@/components/forms/FormTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
type Props = {};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});

const page = (props: Props) => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <div className="h-screen bg-bc-darkblue flex flex-col justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {}}
      >
        {({ errors, touched }) => (
          <Form className="max-w-lg mx-auto w-11/12 flex flex-col">
            <h1 className="text-3xl text-white mb-4">Sign Up</h1>
            <FormTextInput name="email" placeholder="Email" />
            <FormTextInput name="password" placeholder="Password" />
            <FormTextInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="bg-bc-violet-900 text-white p-2 rounded-lg hover:bg-bc-violet-500"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-white mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-bc-violet-900">
          Login
        </a>
      </p>
    </div>
  );
};

export default page;
