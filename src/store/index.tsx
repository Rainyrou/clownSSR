import { configureStore } from "@reduxjs/toolkit";
import { demoReducer } from "@/pages/Demo/store";

const clientStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const serverStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { clientStore, serverStore };
