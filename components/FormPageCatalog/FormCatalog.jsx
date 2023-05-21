import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { withFormikDevtools } from "formik-devtools-extension";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useRouter } from "next/router";


import { NEXT_URL } from "/config/index";
import uploadFileToBlob from "./utilsAzureStorage";


import FormField from "../CommonFormPages/FormField";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});

const initialValues = {
  title: "",
  price: "",
  category: "",
  description: "",
  metaDataImage: "",
};


export default function FormCatalog({ productImage, category }) {
  //State Variables
  const [error, setError] = useState(false);

  //Constants
  const router = useRouter();

  //FetchFunctions
  const addItem = (item) => {
    return axios.post(`${NEXT_URL}/api/products`, item);
  };

  //QueryFunctions
  const {
    mutate: mutateBuildingPermits,
    isLoading: mutateBuildingPermitsLoading,
  } = useMutation(addItem, {
    onSuccess: (data) => {
      console.log({data});
      const id = data.data.id;
      toast.update("customId", {
        render: "Saved Sucessfully",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
      setTimeout(() => {
        router.push(`/pageDetailProduct/${id}`);
      }, 1000)

    },
    onError: (error) => {
      console.log("failed");
      setError(error)

      toast.update("customId", {
        render: "Save Failed",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    },
  });

  const handleSubmit = async (values) => {
    const testing = false;

    //Constants
    const fileName1 = productImage?.name;
    const imagePath = `${uuid()}_${fileName1}`;
    const metaDataImage = { name: fileName1, url: `${imagePath}` };

    //TransformFunctions
    values.metaDataImage = metaDataImage;
    values.category = category;

    if (testing) {
      alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values, null, 2));
      setPageStateRouting("success");
      return;
    }

    try {
      toast.loading("Uploading...", { toastId: "customId" });

      //UploadFunctions
      const blobResults = await Promise.all([
        uploadFileToBlob(productImage, imagePath, "randompics"),
      ]);
      mutateBuildingPermits(values);
      
      setError(false);
    } catch (error) {
      setError(error);
    } 
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          withFormikDevtools(formikProps);

          return (
            <Form className="text-gray-700">
              {error && `${error}`}

              {/* Form Row */}
              <div className="grid grid-cols-12 gap-6 pt-4 pb-1">
                {/* Form Col*/}
                <FormField
                  name={"title"}
                  title={"Product Title"}
                  span={6}
                  type="text"
                />
                {/* Form Col*/}
                <FormField
                  name={"price"}
                  title={"Price"}
                  span={6}
                  type="number"
                />
              </div>
              {/* End Row */}
              {/* Form Row */}
              <div className="grid grid-cols-12 gap-6 pt-4 pb-1">
                {/* Form Col*/}
                <FormField
                  name={"description"}
                  title={"Product Description"}
                  span={12}
                  type="text"
                  as="textarea"
                />
              </div>
              {/* End Row */}

              {/* Bottom Row */}
              <div className="flex justify-end p-4">
                {/* <DeveloperTestingButton
                  setFieldValue={formikProps.setFieldValue}
                  setCurrentAanvrager={setCurrentAanvrager}
                  setCurrentArchitect={setCurrentArchitect}
                /> */}
                <button
                  disabled={mutateBuildingPermitsLoading}
                  type="submit"
                  className="text-white bg-[#2E3E52] hover:bg-[#2E3E52] focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  {mutateBuildingPermitsLoading ? "Submitting" : "Upload"}
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* End Bottom Row */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
