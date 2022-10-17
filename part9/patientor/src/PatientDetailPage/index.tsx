import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useEffect } from "react";
import DiagnosisElement from "./DiagnosisElement";
// import { createPatient } from "../utils";

const PatientDetailPage = () => {
  const [foundPatient, setFoundPatient] = useState({} as Patient);
  const [{ fetchedPatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  if (!(typeof id === "string" || id)) {
    return null;
  }

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: response } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("response : ", response);
        setFoundPatient(response);
        dispatch({ type: "FETCH_PATIENT", payload: response });
      } catch (err) {
        console.log(err);
      }
    };

    if (!fetchedPatients[id]) {
      void fetchPatient();
    } else {
      setFoundPatient(fetchedPatients[id]);
    }
  }, []);

  console.log(foundPatient);
  return (
    <>
      <h2>{foundPatient.name}</h2>
      <p>ssn : {foundPatient.ssn}</p>
      <p>occupation : {foundPatient.occupation}</p>
      <h3>entries</h3>
      {foundPatient.id &&
        foundPatient.entries.map((en) => (
          <div key={en.id}>
            <p>{en.description}</p>
            <ul>
              {en.diagnosisCodes?.map((el) => (
                <DiagnosisElement key={el} code={el} />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default PatientDetailPage;
