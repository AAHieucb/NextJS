"use client";
import { increment } from "@/lib/features/counter/counterSlice";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    // K cần biết page cũ hay mới, néu chưa có store thì tạo mới và pass xuống mọi component dùng.
    // Cái provider này là client component, store được tạo ở phía client bên dưới sẽ tạo 1 lần duy nhất và lưu trong RAM. Chứ việc nó sync vào phía server t k thấy
    console.log("STORE INITED");
    storeRef.current = makeStore();
    storeRef.current.dispatch(increment()); // Dispatch actions bằng store được
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
