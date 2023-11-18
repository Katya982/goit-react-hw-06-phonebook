import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { Label, Input, Button } from './ContactForm.styled'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectContacts } from '../../redux/selectors';

axios.defaults.baseURL = 'https://6557943bbd4bcef8b612e825.mockapi.io';

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
     return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ContactForm = ({ onSubmit }) => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name: name,
      number: number,
    };

    const isContactExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase())

    if (isContactExist) {
      Notiflix.Report.warning(
        'Alert',
        `Contact with name ${contact.name} already exists!`,
        'Ok'
      );
      return;
    }

const isNumberExist = contacts.find(
  (contact) =>
    contact.number &&
    contact.number.replace(/\D/g, '') === number.replace(/\D/g, '')
);

    if (isNumberExist) {
      Notiflix.Report.warning(
        'Alert',
        `Number ${contact.number} is already in contacts!`,
        'Ok'
      );
      return;
    }

    dispatch(addContacts(contact));
    setName('');
    setNumber('');
  };

const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === 'name') {
    setName(value);
  } else if (name === 'number') {
    setNumber(value);
  }
};
  
    return (
      <form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
            value={name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </form>
    );
  
  };

export default ContactForm;

