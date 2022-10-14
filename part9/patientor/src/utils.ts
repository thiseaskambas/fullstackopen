/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Patient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing occupation");
  }
  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("incorrect entries");
  }
  return entries;
};

export const createPatient = (object: any): Patient => {
  return {
    name: parseName(object.name),
    id: parseName(object.id),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};
