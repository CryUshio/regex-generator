import { createLocalStorage } from '~/hooks/createLocalStorage';

export const STORAGE_NAME = 'regexp_generator__main_input';

export interface MainInputStorage {
  lang: string;
}

export function createMainInputStorage(defaultValue?: MainInputStorage) {
  return createLocalStorage<MainInputStorage>(
    defaultValue || {
      lang: '',
    },
    {
      name: STORAGE_NAME,
    },
  );
}
