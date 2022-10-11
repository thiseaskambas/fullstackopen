import patients from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry } from '../types';
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

export default { getNonSensitiveEntries, addPatient };
