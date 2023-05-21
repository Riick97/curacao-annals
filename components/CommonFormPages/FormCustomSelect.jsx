import React from "react";
import Select from "react-select";
import ErrorMessage from "./ErrorMessage";
import ModalAddApplicant from "./ModalAddApplicant";

export const FormCustomSelect = ({
  title,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  isApplicant = false,
  onChangeFunction
}) => {

  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
    if (onChangeFunction) {
      onChangeFunction(option.value);
    }
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <>
      <div className=" col-span-full md:col-span-6 sm:col-span-6 xl:col-span-6">
        {/* Row */}
        <label className="block uppercase tracking-wide text-xs font-bold my-2">
          {title || "Plot Number"}
        </label>
        {/* End Row */}
        {/* Row */}
        <div className="grid grid-cols-12 gap-6">
          <Select
            className={`md:col-span-${isApplicant ? 6 : 12} sm:col-span-${
              isApplicant ? 6 : 12
            } xl:col-span-${isApplicant ? 6 : 12}`}
            name={field.name}
            value={getValue()}
            onChange={onChange}
            maxMenuHeight={123}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
          />
          {isApplicant ? <ModalAddApplicant /> : ""}
        </div>
        {/* End Row */}
        {/* Row */}
        <ErrorMessage name={field.name} component="div" />
      </div>
    </>
  );
};

export default FormCustomSelect;
