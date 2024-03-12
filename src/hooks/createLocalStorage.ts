import { once } from 'lodash-es';
import { onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

interface LocalStorageChangeEvent<T> {
  key: string;
  newVal: T;
}

const EVENT_NAME = 'localStorageChange';

interface CreateLocalStorageOptions {
  name: string;
}

export function createLocalStorage<T extends object>(defaultValue: T, options: CreateLocalStorageOptions) {
  let persistedData: T = defaultValue;

  if (typeof localStorage !== 'undefined') {
    persistedData = getLocalStorageData<T>(options.name) || defaultValue;
  }

  const [store, setStore] = createStore(persistedData);

  const listenStorageChange = once(() => {
    const handler = (e: CustomEvent<LocalStorageChangeEvent<T>>) => {
      if (e.detail.key === options.name) {
        setStore(e.detail.newVal);
      }
    };

    // @ts-ignore
    document.addEventListener(EVENT_NAME, handler);

    // @ts-ignore
    return () => document.removeEventListener(EVENT_NAME, handler);
  });

  onMount(() => {
    const persistedData = getLocalStorageData<T>(options.name);

    if (persistedData) {
      setStore(persistedData);
    }

    const dispose = listenStorageChange();

    onCleanup(() => {
      dispose();
    });
  });

  const setPersistedData = (data: Partial<T>) => {
    setStore((s) => {
      const newVal = Object.assign(s, data);

      localStorage.setItem(options.name, JSON.stringify(newVal));

      document.dispatchEvent(
        new CustomEvent<LocalStorageChangeEvent<T>>(EVENT_NAME, {
          bubbles: true,
          detail: { key: options.name, newVal },
        }),
      );

      return newVal;
    });
  };

  return [store, setPersistedData] as const;
}

function getLocalStorageData<T extends object>(name: string) {
  const dataString = localStorage.getItem(name);

  if (dataString) {
    try {
      return JSON.parse(dataString) as T;
    } catch (error) {}
  }
}
