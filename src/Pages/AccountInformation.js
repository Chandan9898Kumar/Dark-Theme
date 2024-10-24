import React, { useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pages.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemInfo } from '../Redux/Account/AccountInfoRedux';

const textStyle = {
  color: 'red',
  fontSize: '20px',
  textAlign: 'center',
};

const ShowHeader = ({ id }) => {
  return <h1>{`This Account page Shows information of of item whose id is : ${'  '} ${id} `}</h1>;
};
const ShowError = () => {
  return <div style={textStyle}>{isError}</div>;
};

const ShowLoading = () => {
  return <div style={textStyle}>Data is being loaded please wait...</div>;
};

const ShowData = ({ images, title, ...rest }) => {
  const navigate = useNavigate();
  return (
    <div className="Grid-Parent">
      <div className="Grid-Images">
        <img
          className="Img-Responsive"
          src={images[0] ?? ''}
          alt={`${title}`}
          loading="eager"
          width={350}
          height={450}
        />
        <label>{title}</label>
      </div>
      <div className="Grid-Details">
        <div className="parent">
          <dl>
            <dt>Brand:</dt>
            <dd>{rest.brand ?? 'N/A'}</dd>
            <dt>Category:</dt>
            <dd>{rest.category}</dd>
            <dt>Price:</dt>
            <dd>{rest.price}</dd>
            <dt>Description:</dt>
            <dd>{rest.description}</dd>
            <dt>Shipping Information:</dt>
            <dd>{rest.shippingInformation}</dd>
            <dt>Warranty Information:</dt>
            <dd>{rest.warrantyInformation}</dd>
          </dl>
          <button className="Go-Back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountInformationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useSelector((state) => state.AccountInfoPage);

  const { brand, category, description, images, price, shippingInformation, title, warrantyInformation } =
    data[0] || {};

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
    <>
      <ShowHeader id={id} />
      {isLoading ? (
        <ShowLoading />
      ) : (
        <ShowData
          images={images}
          title={title}
          brand={brand}
          category={category}
          description={description}
          shippingInformation={shippingInformation}
          warrantyInformation={warrantyInformation}
          price={price}
        />
      )}
      {isError && <ShowError />}
    </>
  );
};

export default memo(AccountInformationPage);

/**  Above we have used dl,dt, and dd
 * dl (definition list) element, which is a more semantic and accessible way to present key-value pairs.
 * Used dt (definition term) elements for the labels and dd (definition description) elements for the values.
 */
