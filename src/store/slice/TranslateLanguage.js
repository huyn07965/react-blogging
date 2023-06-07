import { createSlice } from "@reduxjs/toolkit";

const translateSlice = createSlice({
  name: "translate",
  initialState: {
    language: "en",
  },
  reducers: {
    translate: (state, action) => {
      const language = action.payload;
      return {
        ...state,
        language,
      };
    },
  },
});
// const persistConfig = {
//   key: "favorite",
//   storage: AsyncStorage,
// };

export const { translate } = translateSlice.actions;
export default translateSlice.reducer;
