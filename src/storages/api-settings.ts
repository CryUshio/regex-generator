import { makePersisted } from '@solid-primitives/storage';
import { createStore } from 'solid-js/store';

export const STORAGE_NAME = 'regexp_generator__api_setting';

export interface ApiSettingStorage {
  model: { label: string; value: string };
  apiKey: string;
}

export function createApiSettingStorage(defaultValue?: ApiSettingStorage) {
  return makePersisted(
    createStore<ApiSettingStorage>(
      defaultValue || {
        model: { label: '', value: '' },
        apiKey: '',
      },
    ),
    {
      name: STORAGE_NAME,
    },
  );
}
