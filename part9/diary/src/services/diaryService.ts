import diaries from '../../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry) => {
  const newDiaryEntry = {
    ...entry,
    id: Math.max(...diaries.map((d) => d.id)) + 1
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
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
  getNonSensitiveEntries,
  findById
};
