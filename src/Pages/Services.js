import React, { memo, useState } from 'react';
import './pages.css';
import AddEditModal from '../Components/AddEditModal';
const PRODUCT_DATA = require('../Constants/Product.json');

const ShowHeader = () => {
  return <h1>Access Your Service</h1>;
};

const ShowData = ({ data, handleEdit, handleDelete }) => {
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div key={item.name + index} className="Service-Items">
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>

            <button onClick={(event) => handleEdit(event, true, item)}>Edit</button>
            <button onClick={(event) => handleDelete(event, item, index)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

const ServicePage = () => {
  const [data, setData] = useState(PRODUCT_DATA || []);
  const [isEditModalOPen, setIsEditModalOPen] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState({});
  const [isAddModalOPen, setIsAddModalOPen] = useState(false);

  const handleEdit = (event = {}, condition = false, editItem = '') => {
    setIsEditModalOPen(condition);
    setEditUserDetails(editItem);
  };

  const handleAdd = (event = {}, condition = false) => {
    setIsAddModalOPen(condition);
  };

  const handleDelete = (event = {}, item, index) => {
    setData(data.filter((removeItem) => removeItem.id !== item.id));
  };

  return (
    <div className="Page-Container">
      <ShowHeader />
      <div className='add-btn-class'>
      <button className='add-btn' onClick={(event) => handleAdd(event, true)}>Add Item</button>
      </div>
      {!!data?.length && <ShowData data={data} handleEdit={handleEdit} handleDelete={handleDelete} />}
      {isEditModalOPen && (
        <AddEditModal
          key="edit"
          onCloseModal={handleEdit}
          title="Edit User Details"
          userDetails={editUserDetails}
          data={data}
          setData={setData}
          isEdit
        />
      )}

      {isAddModalOPen && (
        <AddEditModal key="add" onCloseModal={handleAdd} title="Add New User" data={data} setData={setData} isAdd />
      )}
    </div>
  );
};

export default memo(ServicePage);
