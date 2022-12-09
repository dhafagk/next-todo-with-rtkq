import { createSlice } from "@reduxjs/toolkit";
import { LIMIT } from "../constant";

interface NumberingProps {
  start: number;
  page: number;
}

const initialState: NumberingProps = {
  start: 0,
  page: 1,
};

export const numberingSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    nextStart: (state) => {
      state.start += LIMIT;
    },
    prevStart: (state) => {
      state.start -= LIMIT;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
  },
});
export const { nextStart, prevStart, nextPage, prevPage } =
  numberingSlice.actions;

export default numberingSlice.reducer;
