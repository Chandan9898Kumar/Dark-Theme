import React, { memo, useState, useCallback } from 'react';
import './pages.css';
import AddEditModal from '../Components/AddEditModal';
import { flushSync } from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const PRODUCT_DATA = require('../Constants/Product.json');

function BasicAlerts({ open = false, setOpen, message = 'Successfully deleted product' }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}></IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} action={action} />
    </div>
  );
}

const ShowHeader = () => {
  return <h1 style={{ color: 'rgb(172 183 195)' }}>Access Your Service</h1>;
};

const ShowData = ({ data, handleEdit, handleDelete }) => {
  return (
    <>
      <DenseTable row={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
};

const ButtonSection = ({ handleAdd }) => {
  return (
    <Box display="flex" alignItems="center" mb={0} justifyContent="space-between" padding="20px 20px">
      <p className="product">Products</p>
      <button className="add-btn" onClick={(event) => handleAdd(event, true)}>
        Add Item
      </button>
    </Box>
  );
};
const ServicePage = () => {
  const [data, setData] = useState(PRODUCT_DATA || []);
  const [isEditModalOPen, setIsEditModalOPen] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState({});
  const [isAddModalOPen, setIsAddModalOPen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleEdit = (event = {}, condition = false, editItem = '') => {
    setIsEditModalOPen(condition);
    setEditUserDetails(editItem);
  };

  const handleAdd = useCallback((event = {}, condition = false) => {
    setIsAddModalOPen(condition);
  }, []);

  const handleDelete = (event = {}, item, index) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setData(data.filter((removeItem) => removeItem.id !== item.id));
          setOpen(true);
        });
      });
    } else {
      setData(data.filter((removeItem) => removeItem.id !== item.id));
      setOpen(true);
    }
  };

  return (
    <div className="Page-Container" role='display application'>
      <ShowHeader />

      <ButtonSection handleAdd={handleAdd} />

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

      {open && <BasicAlerts open={open} setOpen={setOpen} />}
    </div>
  );
};

export default memo(ServicePage);

function DenseTable({ row, handleEdit, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{ background: '#f4f6f8' }}>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="right">Edit Event</TableCell>
            <TableCell align="right">Delete Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{ height: '50px' }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="right">
                {' '}
                <Button variant="text" onClick={(event) => handleEdit(event, true, item)}>
                  Edit
                </Button>
              </TableCell>

              <TableCell align="right">
                <Button color="error" variant="text" onClick={(event) => handleDelete(event, item, index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
