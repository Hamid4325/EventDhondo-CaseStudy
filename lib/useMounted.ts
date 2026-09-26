import { useSyncExternalStore } from "react";

// Mount gate that does not need setState-in-effect: React reads getServerSnapshot
// during hydration (so SSR and the first client render agree), then re-renders
// with getSnapshot afterwards. Stable identities to avoid resubscribing.
const noopSubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useMounted() {
  return useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot);
}
