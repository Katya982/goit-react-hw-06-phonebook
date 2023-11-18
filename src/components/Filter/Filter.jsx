import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice'; 
import { selectFilters } from '../../redux/selectors';
import { Input } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilters);


  const onChange = e => {
    dispatch(setFilter(e.target.value))
  };

  return (
    <label>
      Filter contacts by name:
      <Input
        type="text"
        value={filterValue}
      onChange={onChange} />
    </label>
  );
};

export default Filter;
