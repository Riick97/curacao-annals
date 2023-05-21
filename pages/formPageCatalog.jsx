import React, { useState, useEffect } from "react";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import DropzoneSearch from "/components/FormPageCatalog/DropzoneSearch";
import Loader from "/components/CommonAllPages/Loader";

import dynamic from "next/dynamic";
const FormCatalog = dynamic(
  () => import("/components/FormPageCatalog/FormCatalog"),
  { ssr: false }
);

export default function FormPageCatalog() {
  //StateVariables
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState([]);

  //Constants
  const showResultsSection = showResults && files.length > 0;
  const showSearchButton = !loading && !showResults && files.length > 0;

  //TransformFunctions
  const detectObjectsOnImage = async (imageElement, imgSize) => {
    //Constants
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElement, 6);

    console.log({ predictions });
    setPredictions(predictions);
  };

  const analyze = (dataUrl) => {
    setLoading(true);

    //Constants
    const imageElement = document.createElement("img");
    imageElement.src = dataUrl;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };

      await detectObjectsOnImage(imageElement, imgSize);
      setLoading(false);
      setShowResults(true);
    };
  };

  const onSetFile = (files) => {
    setShowResults(false);
    setFiles(files);
  };

  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Upload Products
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          {/* Section Row */}
          <div className="">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-5">
                Product Image
              </label>
              <DropzoneSearch files={files} setFiles={onSetFile} />
            </div>
          </div>
          {/* End Section Row */}
          {/* Section Row */}
          {showSearchButton && (
            <div className="flex justify-center items-center mt-7">
              <button
                onClick={() => {
                  const dataUrl = files[0].preview;
                  analyze(dataUrl);
                }}
                type="button"
                className="w-48 flex justify-center text-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Analyze Image
              </button>
            </div>
          )}
          {/* End Section Row */}

          {/* Section */}
          <div className="my-10">{loading && <Loader />}</div>

          {/* Section */}
          {showResultsSection && (
            <div className="border-b border-gray-200 pb-5 mt-10">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Category: {predictions[0]?.class || "Category Not Found"}
              </h3>
            </div>
          )}

          {/* Section */}
          {showResultsSection && (
            <FormCatalog
              productImage={files[0]}
              category={predictions[0]?.class || "Category Not Found"}
            />
          )}
        </div>
        {/* /End replace */}
      </div>
    </>
  );
}
