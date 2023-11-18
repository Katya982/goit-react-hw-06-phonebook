import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactItem, ContactRoster, Button, Item } from './ContactList.styled';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectError, selectLoading, selectFilteredContacts } from '../../redux/selectors';

axios.defaults.baseURL = 'https://6557943bbd4bcef8b612e825.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ContactRoster>
      {isLoading && !error ? (
        <p>Loading ...</p>
      ) : filteredContacts.length === 0 && !error ? (
        <p>Your phonebook is empty</p>
      ) : (
        filteredContacts.map(({ name, number, id }) => (
          <ContactItem key={id}>
          <Item>{name}</Item>
          <Item>{number}</Item>
            <Button type="button" onClick={() => dispatch(deleteContacts(id))}>
              Delete
            </Button>
          </ContactItem>
        ))
      )}
    </ContactRoster>
  );
};

export default ContactList;