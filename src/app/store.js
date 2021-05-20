import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import socketClient from '../feature/socketClient';
import userReducer from '../feature/user';
import rooms from '../feature/rooms';
import inviteSlide from '../feature/friendRequest';
import partner from '../feature/partner';
export default configureStore({
  reducer: {
    user: userReducer,
    socket: socketClient,
    rooms: rooms,
    invites: inviteSlide,
    partner: partner,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
