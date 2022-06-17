import React,{memo} from 'react'
import '../scss/add-todo.scss'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Button } from '@mui/material';
import {  useDispatch , useSelector } from 'react-redux';
import { addTodo } from '../redux/todo/todoSlice';
import { activeUser } from '../redux/user/userSlice';
import { useFormik } from 'formik';


 function AddTodo({closeModal}) {
    const user = useSelector(activeUser);
    const dispatch = useDispatch();

  const { handleSubmit, handleChange,values } = useFormik({
    initialValues: {
      title: '',
      text: '',
      toBeCompDate:'',
      addedDate:'added date',
      byUsername:user.username
    },
    onSubmit: values => {
      dispatch(addTodo(values)) //yeni todo ekleniyor.
      closeModal();
    },
  });


  return (
    <>
      <form onSubmit={handleSubmit}  className='add-todo'>
        <FormGroup className='group'>
          <TextField 
            value={values.title}
            id="todo"
            name='title'
            label="Başlık"
            variant="standard"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup className='group'>
          <TextField 
            value={values.text}
            id="todo"
            name='text'
            label="Metin"
            variant="standard"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup className='group'>
          <TextField
            style={{'width':'100%'}}
            id="toBeCompDate"
            label="Tamamlanması Gereken Tarih"
            type="date"
            variant="standard"
            name='toBeCompDate'
            value={values.toBeCompDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </FormGroup>
        <Button type="submit" fullWidth  variant="contained"  sx={{ mt: 3, mb: 2 }}>
          Ekle
        </Button>
      </form>
    </>
  )
}
export default memo(AddTodo);