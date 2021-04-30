import {createSlice} from '@reduxjs/toolkit';
export const partner = createSlice({
  name: 'panner',
  initialState: {},
  reducers: {
    setPartner: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {setPartner} = partner.actions;
export default partner.reducer;
