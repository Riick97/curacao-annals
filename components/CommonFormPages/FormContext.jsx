import { set } from "lodash";
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const initialValues = {
  vergunning: "",
  soortBouwwerk: "",
  dakBedekking: "",
  aanvrager: "",
  architect: "",
  ropPerceelOfMeetbrieven: "",
  beganeGrond: "",
  verdiepingen: "",
  gebouw: "",
  bouwWaarde: "",
  imageFile1: {
    name: "",
    url: "",
  },
};

const applicantOptions = [];

function useGetState() {
  const [state, setState] = useState({ ...initialValues });
  const [applicantOptionsState, setApplicantOptionsState] = useState([
    ...applicantOptions,
  ]);

  const resetState = () => {
    setState({ ...initialValues });
  };

  return {
    state,
    setState,
    resetState,
    applicantOptionsState,
    setApplicantOptionsState,
  };
}

export const Provider = ({ children }) => {
  const data = useGetState();
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useStateValue = () => useContext(Context);
