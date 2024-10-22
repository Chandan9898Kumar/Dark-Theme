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

  const { brand, category, description, images, price, shippingInformation, title, warrantyInformation } =
    data[0] || {};

  const textStyle = {
    color: 'red',
    fontSize: '20px',
    textAlign: 'center',
  };

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

  const ShowHeader = () => {
    return <h1>{`This Account page Shows information of of item whose id is : ${'  '} ${id} `}</h1>;
  };

  const ShowLoading = () => {
    return <div style={textStyle}>Data is being loaded please wait...</div>;
  };

  const ShowData = () => {
    return (
      <div className="Grid-Parent">
        <div className="Grid-Images">
          <img
            className="Img-Responsive"
            src={images[0] ?? ''}
            alt={`${title}`}
            loading="lazy"
            width={350}
            height={450}
          />
          <label>{title}</label>
        </div>
        <div className="Grid-Details"></div>
      </div>
    );
  };

  const ShowError = () => {
    return <div style={textStyle}>{isError}</div>;
  };
  return (
    <>
      <ShowHeader />
      {isLoading ? <ShowLoading /> : <ShowData />}
      {isError && <ShowError />}
    </>
  );
};

export default memo(AccountInformationPage);
