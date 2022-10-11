import diagnoses from '../../data/diagnoses';
import { DiagnosisEnty } from '../types';

const getDiagnoses = (): Array<DiagnosisEnty> => {
  return diagnoses;
};

export default { getDiagnoses };
