import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export default store;
