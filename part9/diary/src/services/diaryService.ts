import diaries from '../../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const addDiary = () => {
  return null;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
