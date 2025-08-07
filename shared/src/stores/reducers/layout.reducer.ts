import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  collapsed: boolean;
}

const initialState: InitialState = {
  collapsed: false,
};

const productSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = productSlice.actions;
export default productSlice.reducer;
