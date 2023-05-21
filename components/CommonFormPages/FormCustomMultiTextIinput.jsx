import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";
import ErrorMessage from "./ErrorMessage";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default function FormCustomMultiTextIinput({
  isMulti = true,
  options = [],
  span = 6,
  title = "title",
  field,
  form,
  placeholder,
  middleWare,
}) {
  //FormState Variables
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    

    if (
      options.filter((item) => {
        if (middleWare && inputValue) {
          const formattedItem = middleWare(inputValue)
          return item.value.trim() === formattedItem.trim();
        }
        return item.value.trim() === inputValue.trim();
      }).length < 1



    ) {
      return;
    }

    if (!inputValue) return;
    
    switch (event.key) {
      case "Enter":
      case "Tab":
        // console.group("Value Added");
        // console.log(value);
        // console.groupEnd();
        const newValue = [...value, createOption(inputValue)];
        setValue(newValue);
        form.setFieldValue(field.name, newValue);
        event.preventDefault();
        setInputValue("");
    }
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleChange = (value, actionMeta) => {
    console.group("Value Changed");
    console.log({ value });
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setValue(value);
    form.setFieldValue(field.name, value);
  };

  return (
    <>
      <div className={` col-span-full md:col-span-${span} sm:col-span-${span} xl:col-span-${span} mb-10`}>
        {/* Row */}
        <label className="block uppercase tracking-wide text-xs font-bold my-2">
          {title || "Plot Number"}
        </label>
        {/* End Row */}
        {/* Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* <Select
            className={`md:col-span-${isApplicant ? 6 : 12} sm:col-span-${
              isApplicant ? 6 : 12
            } xl:col-span-${isApplicant ? 6 : 12}`}
            name={field.name}
            value={getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
          /> */}

          <CreatableSelect
            className={`md:col-span-${false ? 6 : 12} sm:col-span-${false ? 6 : 12
              } xl:col-span-${false ? 6 : 12}`}
            components={components}
            name={field.name}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            // placeholder="Type something and press enter..."
            placeholder={placeholder}
            value={value}
          />
        </div>
        {/* End Row */}
        {/* Row */}
        <ErrorMessage name={field.name} component="div" />
      </div>
    </>
  );
}
