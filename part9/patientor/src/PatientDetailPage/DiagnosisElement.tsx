import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const DiagnosisElement = ({ code }: { code: string }) => {
  const [foundEntry, setFoundEntry] = useState({} as Diagnosis);
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const { data: response } = await axios.get<Diagnosis>(
          `${apiBaseUrl}/diagnoses/${code}`
        );
        setFoundEntry(response);
      } catch (err) {
        console.log(err);
      }
    };
    void fetchEntry();
  }, []);

  return (
    <>
      {foundEntry.code} : {foundEntry.name}
    </>
  );
};

export default DiagnosisElement;
