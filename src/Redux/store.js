import { configureStore } from '@reduxjs/toolkit';
import Account from './Account/AccountRedux';

const Store = configureStore({
  reducer: {
    AccountPage: Account,
  },
});

export default Store;
