import {createSlice} from '@reduxjs/toolkit';
export const roomSlide = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    roomActive: (state, action) => {
      state.rooms = state.rooms.map(room => {
        if (room._id === action.payload.room)
          room.members = room.members.map(mem => {
            if (mem._id === action.payload.user)
              mem.status = action.payload.status;
            return mem;
          });
        return room;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRooms, roomActive} = roomSlide.actions;

export default roomSlide.reducer;
