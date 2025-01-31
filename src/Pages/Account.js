import React, { useEffect, memo } from 'react';
import './pages.css';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../Redux/Account/AccountRedux';
import { Link } from 'react-router-dom';

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
    <div className="Page-Container" role="section">
      <ShowHeader />
      <div className="Item-Main" role="items">
        {isLoading ? <ShowLoading /> : !!data?.length && <ShowData data={data} />}
      </div>
      {isError && (
        <div role="alert" aria-live="assertive">
          {isError}
        </div>
      )}
    </div>
  );
};

export default memo(AccountPage);

const ShowHeader = () => {
  return <h1 role="heading">This is Account Page Shows Images</h1>;
};

const ShowLoading = () => {
  return <div role="message">Please Wait while your data is being loaded...</div>;
};

const ShowData = ({ data }) => {
  return (
    <div className="card-group">
      {data?.map((item) => {
        return (
          <Link
            key={item.id}
            rel="prefetch"
            to={`/account/${item.id}`}
            className="card transition"
            role="listitem"
            aria-label={item.title}
          >
            <img src={item.images[0]} alt={`${item.title}`} loading="lazy" width={250} height={350} />
            <label>{item.title}</label>
          </Link>
        );
      })}
    </div>
  );
};
