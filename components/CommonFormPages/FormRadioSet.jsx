import React from "react";
import { Formik, Form, Field } from "formik";
import ErrorMessage from "./ErrorMessage";

export default function FormRadioSet({
  placeholder,
  field,
  form,
  title = "title",
  options = [
    { label: "option1", value: "value1" },
    { label: "option1", value: "value1" },
  ],
  onChangeFunction,
}) {
  const onChange = (option) => {
    form.setFieldValue(field.name, option.value);
    console.log(field.name, option);
    if (onChangeFunction) {
      onChangeFunction(option.value);
    }
  };


  return (
    <div className=" col-span-full md:col-span-4 sm:col-span-4 xl:col-span-4">
      <label className="block uppercase tracking-wide text-xs font-bold my-2 mb-6">
        {title}
      </label>
      <fieldset className="resize-none border rounded-md appearance-none block w-full bg-gray-50 border-gray-200 py-2 px-4 pt-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        {options.map((option, index) => {
          return (
            <div key={index} className="flex items-center mb-4">
              <Field
                type="radio"
                name={field.name}
                value={option.value}
                onChange={() => onChange(option)}
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              />
              <label className="text-sm font-medium text-gray-900 ml-2 block">
                {option.label}
              </label>
            </div>
          );
        })}
      </fieldset>
      <ErrorMessage name={field.name} component="div" />
    </div>
  );
}
