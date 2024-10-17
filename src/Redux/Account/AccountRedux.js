import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isError: '',
  data: [],
};

const AccountState = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setData } = AccountState.actions;
export default AccountState.reducer;
