import React, { useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pages.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemInfo } from '../Redux/Account/AccountInfoRedux';
const AccountInformationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSelector((state) => state.AccountInfoPage);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      const result = await response.json();

      dispatch(
        fetchItemInfo({
          data: result.products.filter((item) => parseInt(item.id) === parseInt(id)),
          isLoading: false,
          isError: '',
        })
      );
    } catch ({ message }) {
      dispatch(fetchItemInfo({ data: [], isError: message, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{`This Account page Shows information of of item whose id is : ${'  '} ${id} `}</h1>
    </div>
  );
};

export default memo(AccountInformationPage);
