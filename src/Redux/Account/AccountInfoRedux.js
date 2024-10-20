import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: true,
  isError: '',
};

const AccountInfo = createSlice({
  name: 'accountInfo',
  initialState,
  reducers: {
    fetchItemInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { fetchItemInfo } = AccountInfo.actions;
export default AccountInfo.reducer;
