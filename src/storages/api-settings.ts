import { createLocalStorage } from '~/hooks/createLocalStorage';

export const STORAGE_NAME = 'regexp_generator__api_setting';

export interface ApiSettingStorage {
  model: { label: string; value: string };
  apiKey: string;
}

export function createApiSettingStorage(defaultValue?: ApiSettingStorage) {
  return createLocalStorage<ApiSettingStorage>(
    defaultValue || {
      model: { label: '', value: '' },
      apiKey: '',
    },
    {
      name: STORAGE_NAME,
    },
  );
}
