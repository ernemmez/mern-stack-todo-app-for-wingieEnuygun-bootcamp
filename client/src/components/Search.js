import React, {memo} from 'react'
import TextField from '@mui/material/TextField';
import {useDispatch} from 'react-redux';
import {searchTodos} from '../redux/todo/todoSlice';

 function Search({searchHandle}) {
  const dispatch = useDispatch();
  


  const handleChange = (e) => {
    dispatch(searchTodos(e.target.value));
  }
  return (
    <div className='search-main'>
        <TextField label="Bir todo, todo metini veya kullanıcı ara..." variant="standard" className='search-field' onChange={handleChange}/>
    </div>
  )
}
export default memo(Search);