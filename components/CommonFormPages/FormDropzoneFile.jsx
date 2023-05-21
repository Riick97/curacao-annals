import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import ErrorMessage from "./ErrorMessage";
import FormFieldTitle from "./FormFieldTitle";

export default function FormDropzone({
  placeholder,
  maxFileSize = 2000000,
  field,
  form,
  tooltip,
  span = 6,
  title = "title",
  options = [
    { label: "option1", value: "value1" },
    { label: "option1", value: "value1" },
  ],
  onChangeFunction,
  onDropHandler,
  onDeleteHandler,
  images,
  setImages,
}) {
  const onChange = (option) => {
    form.setFieldValue(field.name, option[0]?.name || "");
    // if (onChangeFunction) {
    //   onChangeFunction(option.value);
    // }
  };

  return (
    <div
      className={` col-span-full md:col-span-${span} sm:col-span-${span} xl:col-span-${span}`}
    >
      <FormFieldTitle title={title} tooltip={tooltip} />
      <DropzoneArea
        dropzoneText="Upload files here"
        onDrop={(files) => onDropHandler(files, 1, images, setImages)}
        onDelete={(file) => onDeleteHandler(file, 1, images, setImages)}
        onChange={onChange}
        maxFileSize={maxFileSize}
        filesLimit={1}
        acceptedFiles={["image/*", ".pdf"]}
        showPreviews={true}
        showFileNames
        showPreviewsInDropzone={false}
        previewText="Selected files"
      />
      <ErrorMessage name={field.name} component="div" />
    </div>
  );
}
