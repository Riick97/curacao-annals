import React from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";

export default function ErrorMessage({ name, component }) {
  return (
    <FormikErrorMessage
      className="text-red-500 ml-1 mb-5"
      name={name}
      component={component}
    />
  );
}
