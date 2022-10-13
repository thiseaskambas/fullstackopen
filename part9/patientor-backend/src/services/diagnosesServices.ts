import diagnoses from '../../data/diagnoses';
import { DiagnosisEnty } from '../types';

const getDiagnoses = (): Array<DiagnosisEnty> => {
  return diagnoses;
};

const getDiagnoseByCode = (code: string): DiagnosisEnty | undefined => {
  return diagnoses.find((el) => el.code === code);
};

export default { getDiagnoses, getDiagnoseByCode };
