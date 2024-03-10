import { makePersisted } from '@solid-primitives/storage';
import { createStore } from 'solid-js/store';

export const STORAGE_NAME = 'regexp_generator__main_input';

export interface MainInputStorage {
  lang: string;
}

export function createMainInputStorage(defaultValue?: MainInputStorage) {
  return makePersisted(
    createStore<MainInputStorage>(
      defaultValue || {
        lang: '',
      },
    ),
    {
      name: STORAGE_NAME,
    },
  );
}
