import type { PiniaPluginContext } from 'pinia';

export default function localStoragePlugin(context: PiniaPluginContext) {
  const { store } = context;
  const storedState = localStorage.getItem(store.$id);
  if (storedState) {
    store.$patch(JSON.parse(storedState));
  }
  store.$subscribe((mutations, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
}
