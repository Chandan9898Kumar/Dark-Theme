import React, { memo, useState } from "react";
import "./modal.css";
import PropTypes from "prop-types";

const AddEditModal = ({
  title = "Modal",
  onCloseModal = () => {},
  userDetails = {},
  data = [],
  setData = () => {},
  isEdit = false,
  isAdd = false,
}) => {
  const [id, setId] = useState(userDetails?.id ? userDetails.id : "");
  const [name, setName] = useState(userDetails?.name ? userDetails.name : "");
  const [description, setDescription] = useState(
    userDetails?.description ? userDetails.description : ""
  );
  const [price, setPrice] = useState(
    userDetails?.price ? userDetails.price : ""
  );

  const [message, setMessage] = useState("");

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
      setData(
        data.map((item) => (item.id === id ? { ...item, ...payload } : item))
      );
    } else if (isAdd) {
      const existingItem = data.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
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
          <label>
            Id : {}
            <input
              disabled={isEdit}
              type="text"
              value={id}
              onChange={(event) => handleChange(event.target.value, "id")}
            />
          </label>
          <label>
            Name : {}
            <input
              type="text"
              value={name}
              onChange={(event) => handleChange(event.target.value, "name")}
            />
          </label>
          <label>
            Description : {}
            <input
              type="text"
              value={description}
              onChange={(event) =>
                handleChange(event.target.value, "description")
              }
            />
          </label>
          <label>
            Price : {}
            <input
              type="text"
              value={price}
              onChange={(event) => handleChange(event.target.value, "price")}
            />
          </label>
        </div>

        <div className="modal-footer">
          <button onClick={(event) => onCloseModal(event, false)}>
            Cancel
          </button>
          <button onClick={(event) => handleProceed(event)}>Proceed</button>
        </div>
        {message && <h1>{message}</h1>}
      </div>
    </div>
  );
};

export default memo(AddEditModal);

// propTypes.AddEditModal = {
//   onCloseModal: PropTypes.func,
// };
