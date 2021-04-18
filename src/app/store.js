import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import socketClient from '../feature/socketClient';
import userReducer from '../feature/user';
import rooms from '../feature/rooms';
export default configureStore({
  reducer: {
    user: userReducer,
    socket: socketClient,
    rooms: rooms,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
