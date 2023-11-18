import { configureStore } from "@reduxjs/toolkit";
import {contactsReduser}  from "../redux/contactFormSlice";
import { filterReduce } from './filterSlice';


export const store = configureStore({
    reducer: {
        contacts: contactsReduser,
        filter: filterReduce,
    }
});