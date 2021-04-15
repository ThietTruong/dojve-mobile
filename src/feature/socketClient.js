import {createSlice} from '@reduxjs/toolkit';
import io from 'socket.io-client';
export const socketSlice = createSlice({
  name: 'socket',
  initialState: {},
  reducers: {
    connectSocket: (state, action) => {
      state.current = io.connect(`http://localhost:5000`, {
        query: {
          token: action.payload,
        },
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {connectSocket} = socketSlice.actions;

export default socketSlice.reducer;
