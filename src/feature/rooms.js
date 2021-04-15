import { createSlice } from "@reduxjs/toolkit";
export const roomSlide = createSlice({
  name: "socket",
  initialState: {
    rooms: [],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    roomActive: (state, action) => {
      state.rooms = state.rooms.map((room) => {
        if (room._id === action.payload._id)
          room.status = action.payload.status;
        return room;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRooms, roomActive } = roomSlide.actions;

export default roomSlide.reducer;
