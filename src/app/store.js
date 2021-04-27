import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import socketClient from '../feature/socketClient';
import userReducer from '../feature/user';
import rooms from '../feature/rooms';
import inviteSlide from '../feature/friendRequest';
export default configureStore({
  reducer: {
    user: userReducer,
    socket: socketClient,
    rooms: rooms,
    invites: inviteSlide,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
