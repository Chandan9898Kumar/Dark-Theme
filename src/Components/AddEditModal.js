import React, { memo, useState } from 'react';
import './modal.css';
import PropTypes from 'prop-types';

const AddEditModal = ({
  title = 'Modal',
  onCloseModal = () => {},
  userDetails = {},
  data = [],
  setData = () => {},
  isEdit = false,
  isAdd = false,
}) => {
  const [id, setId] = useState(userDetails?.id ?? '');
  const [name, setName] = useState(userDetails?.name ?? '');
  const [description, setDescription] = useState(userDetails?.description ?? '');
  const [price, setPrice] = useState(userDetails?.price ?? '');

  const [message, setMessage] = useState('');

  const userEvents = {
    id: (value) => setId(value),
    name: (value) => setName(value),
    description: (value) => setDescription(value),
    price: (value) => setPrice(value),
  };

  const handleChange = (value, type) => {
    const onChangeEvent = userEvents[type];
    if (onChangeEvent) {
      onChangeEvent(value);
    }
  };

  const handleProceed = (event) => {
    const payload = { id, name, description, price };

    if (isEdit) {
      setData(data.map((item) => (item.id === id ? { ...item, ...payload } : item)));
    } else if (isAdd) {
      const existingItem = data.find((item) => parseInt(item.id) === parseInt(id));
      if (existingItem) {
        setMessage(`User with ID ${id} already exists`);
        return;
      } else {
        setData([...data, payload]);
      }
    }
    onCloseModal(event, false);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => onCloseModal(false)}>
            &times;
          </span>
          <h4>{title}</h4>
        </div>

        <div className="modal-body">
          <label>ID :</label>
          <input
            className="Input-Field"
            disabled={isEdit}
            type="text"
            value={id}
            onChange={(event) => handleChange(event.target.value, 'id')}
          />
          <label>Name :</label>
          <input
            className="Input-Field"
            type="text"
            value={name}
            onChange={(event) => handleChange(event.target.value, 'name')}
          />
          <label>Description :</label>
          <input
            className="Input-Field"
            type="text"
            value={description}
            onChange={(event) => handleChange(event.target.value, 'description')}
          />
          <label>Price :</label>
          <input
            className="Input-Field"
            type="text"
            value={price}
            onChange={(event) => handleChange(event.target.value, 'price')}
          />
        </div>

        <div className="modal-footer" role="footer-buttons">
          <button onClick={(event) => onCloseModal(event, false)}>Cancel</button>
          <button onClick={(event) => handleProceed(event)}>Proceed</button>
        </div>
        {message && <h1 role="message">{message}</h1>}
      </div>
    </div>
  );
};

AddEditModal.propTypes = {
  title: PropTypes.string,
  onCloseModal: PropTypes.func,
  userDetails: PropTypes.object,
  data: PropTypes.array,
  setData: PropTypes.func,
  isEdit: PropTypes.bool,
  isAdd: PropTypes.bool,
};

export default memo(AddEditModal);
