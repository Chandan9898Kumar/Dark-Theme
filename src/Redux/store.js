import { configureStore } from '@reduxjs/toolkit';
import Account from './Account/AccountRedux';
import AccountInfo from './Account/AccountInfoRedux';
const Store = configureStore({
  reducer: {
    AccountPage: Account,
    AccountInfoPage: AccountInfo,
  },
});

export default Store;
