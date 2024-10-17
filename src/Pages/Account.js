import React, { useEffect, memo } from 'react';
import './pages.css';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../Redux/Account/AccountRedux';
const AccountPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.AccountPage);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      const result = await response.json();
      dispatch(setData({ data: result.products, isLoading: false, isError: '' }));
    } catch ({ message }) {
      dispatch(setData({ data: [], isError: message, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Page-Container">
      <h1>This is Account Page</h1>

      {isLoading ? (
        <div>Please Wait while your data is being loaded...</div>
      ) : (
        !!data?.length &&
        data.map((item, index) => {
          return <li key={item.id}>{item.description}</li>;
        })
      )}
      {isError && <div>{isError}</div>}
    </div>
  );
};

export default memo(AccountPage);
