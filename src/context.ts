import { Session } from '@supabase/supabase-js';
import { createContext } from 'solid-js';
import { SetStoreFunction, createStore } from 'solid-js/store';

interface StoreValue {
  sessionInitialized: boolean;
  session: Session | null;
}

const [store, setStore] = createStore<StoreValue>({
  sessionInitialized: false,
  session: null,
});
const initialValue = { store, setStore };

const Context = createContext<{ store: StoreValue; setStore: SetStoreFunction<StoreValue> }>(initialValue);

export { Context, initialValue };
