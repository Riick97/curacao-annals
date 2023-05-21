import React from "react";
import { Formik, Form, Field } from "formik";
import ErrorMessage from "./ErrorMessage";

export default function FormField({ title, name, span, type, onChange, as }) {
  return (
    <div
      className={`col-span-full md:col-span-${span} sm:col-span-${span} xl:col-span-${span}`}
    >
      <label className="block uppercase tracking-wide text-xs font-bold my-2">
        {title}
      </label>
      {onChange ? (
        <Field
          className="resize-none border rounded-md appearance-none block w-full bg-gray-50 border-gray-200 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={type}
          name={name}
          onChange={onChange}
          as={as}
        />
      ) : (
        <Field
          className="resize-none border rounded-md appearance-none block w-full bg-gray-50 border-gray-200 py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={type}
          name={name}
          as={as}
        />
      )}

      <ErrorMessage name={name} component="div" />
    </div>
  );
}
