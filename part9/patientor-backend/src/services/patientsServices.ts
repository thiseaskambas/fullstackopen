import patients from '../../data/patients';
import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (obj: NewPatientEntry) => {
  const id: string = uuid();
  const newPatient = { ...obj, id };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  const found = patients.find((el) => el.id === id);
  console.log(found);
  return found;
};

export default { getNonSensitiveEntries, addPatient, getPatientById };
