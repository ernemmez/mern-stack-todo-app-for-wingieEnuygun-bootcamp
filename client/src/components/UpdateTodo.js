import React,{useEffect,useState,memo} from 'react'
import '../scss/add-todo.scss'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Button } from '@mui/material';
import {  useDispatch , useSelector } from 'react-redux';
import { updateTodo } from '../redux/todo/todoSlice';
import { activeUser } from '../redux/user/userSlice';
import { todoS } from '../redux/todo/todoSlice';
import { useFormik } from 'formik';


function UpdateTodo({closeModal,id}) {
    const user = useSelector(activeUser);
    const todos = useSelector(todoS);
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const [currentTodo,setCurrentTodo] = useState(todos.find((t)=> t._id === id));
    const [disabled,setDisabled] = useState(false);


    useEffect(() => {
        // component ilk yüklendiğinde burası çalışır
        if(user.username === currentTodo.byUsername){

        }else{
            setDisabled(true)
        }
      }, [closeModal,dispatch,currentTodo.byUsername,user.username]);
    

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
        ...currentTodo,
      title: currentTodo.title,
      text: currentTodo.text,
      toBeCompDate:currentTodo.toBeCompDate
    },
    onSubmit: values => {
        if(user.username === values.byUsername){
            dispatch(updateTodo(values)); //todo update
            closeModal();
        }else{
            setDisabled(true)
            closeModal();
            alert('Bu todoyu değiştirmeye yetkiniz yok!');
        }
    },
  });


  return (
    <>
      <form onSubmit={handleSubmit}  className='add-todo'>
        {disabled ? <span style={{color:'red'}}>Bu Todo Size Ait Değil !</span> : null}
        <FormGroup className='group'>
          <TextField
            disabled={disabled}
            value={values.title}
            id="todo_title"
            name='title'
            defaultValue={currentTodo.title}
            onChange={handleChange}
            label='Başlık'
          />
        </FormGroup>
        <FormGroup className='group'>
          <TextField 
            disabled={disabled}
            value={values.text}
            id="todo_text"
            name='text'
            onChange={handleChange}
            defaultValue={currentTodo.text}
            label='Metin'
          />
        </FormGroup>
        <FormGroup className='group'>
          <TextField
            disabled={disabled}
            style={{'width':'100%'}}
            id="todo_toBeCompDate"
            type="date"
            name='toBeCompDate'
            defaultValue={currentTodo.toBeCompDate}
            value={values.toBeCompDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            label='Tamamlanması Gereken Tarih'
          />
        </FormGroup>
        <Button disabled={disabled} type="submit" fullWidth  variant="contained"  sx={{ mt: 3, mb: 2 }}>
          Güncelle
        </Button>
      </form>
    </>
  )
}
export default memo(UpdateTodo);