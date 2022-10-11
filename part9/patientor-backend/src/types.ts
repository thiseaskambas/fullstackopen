//NOTE: TypeScript enum allows us to use the actual values in our code at runtime, not only in the compilation phase.

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export interface DiagnosisEnty {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
