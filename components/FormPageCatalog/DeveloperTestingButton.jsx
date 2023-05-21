import React from "react";

export default function DeveloperTestingButton({
  setCurrentArchitect,
  setCurrentAanvrager,
  setServiceId,
  setModelId,
  setFieldValue,
  loading,
}) {
  const devMode = true;

  return (
    <>
      {devMode && (
        <button
          onClick={() => {
            console.log("autofillActive");
            const autoFillValues = {
              vergunning: "niewbouw",
              soortBouwwerk: "woonhuis",
              dakBedekking: "dakpannen",
              aanvrager: 147,
              architect: 150,
              ropPerceelOfMeetbrieven: [
                {
                  label: "1-A-1",
                  value: "1-A-1",
                },
                {
                  label: "1-A-2",
                  value: "1-A-2",
                },
              ],
              beganeGrond: 123,
              verdiepingen: 123,
              gebouw: 123,
              bouwWaarde: 13,
              // ropFilesGoedKeuringBrieven: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.sm6h1dp9ch-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesBestekTekeningen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.6w0wp03wyhd-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesSituatieTekeningen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.mc8j96ycev-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesPlattegronden: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.nvqfi5a05jf-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesFunderingRioleringPlannen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.9crajgtkke-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesGevels: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.czlu990st79-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesDoorsneden: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.91ibvobsyc-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesKapPlannen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.pi0q884w0n-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesDetails: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.g9xcyy8aej-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesNoterieleAkten: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.pt2sjptnhh-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesMinBeschikkingen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.6n92pedkk5o-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesReserveringBrieven: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.r8ryar51rs-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesIdentifications: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.y5njn4ab9ig-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesUitreksels: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.07col3t3udmb-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesKoopOvereenkomsten: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.rl2oukerd4-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesConstructieTekeningen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.fjv23nibt7-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesBerekeningen: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.csicj0064mr-BONAIRE_C_00040_00011_BON.pdf",
              // },
              // ropFilesDtiFormulieren: {
              //   name: "BONAIRE_C_00040_00011_BON.pdf",
              //   url: "0.h9w2hw295aw-BONAIRE_C_00040_00011_BON.pdf",
              // },
            };
            
            //TransformFunctions
            setCurrentArchitect(autoFillValues.architect);
            setCurrentAanvrager(autoFillValues.aanvrager);
            Object.keys(autoFillValues).forEach((field) =>
              setFieldValue(field, autoFillValues[field], false)
            );

          }}
          disabled={loading}
          type="button"
          className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Developer: Autofill
        </button>
      )}
    </>
  );
}
