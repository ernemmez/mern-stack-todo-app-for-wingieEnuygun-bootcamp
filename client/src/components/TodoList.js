import React, { memo, useState, useCallback, useEffect} from 'react';
import '../scss/todo-list.scss';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from "react-redux";
import {toggle,deleteTodo,clearAllCompleted, toggleAll as toggleAllDispatch,uncheckAll, filteredTodoS, todoS} from '../redux/todo/todoSlice';
import {VscChromeClose} from 'react-icons/vsc'
import {BiEditAlt} from 'react-icons/bi'
import AddTodo from './AddTodo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UpdateTodo from './UpdateTodo';
import { activeUser } from '../redux/user/userSlice';




 function TodoList({filtered}) {
  
    const dispatch = useDispatch();
    const user = useSelector(activeUser);
    const todos  = useSelector(todoS);
    const [addOpen, setAddOpen] = useState(false); //Add Todo Modal
    const [updateOpen, setUpdateOpen] = useState(false); //Update Todo Modal
    const [todoToUpdate,setTodoToUpdate] = useState(false); //Update edilecek todo
    const [toggleAll,setToggleAll] = useState(false); //toggleAll için 
    const searchedTodos = useSelector(filteredTodoS);
    

    useEffect(()=>{//didmount anında bütün todolar'ın statusu kontrol edilecek true ise toggleAll'ı true yapıyoruz
      if(todos.every(todo => todo.status === true)){  
        setToggleAll(true)
      }else{
        setToggleAll(false)
      }
    },[todos]);
    
    const handleAddOpen = () => setAddOpen(true);
   
    const handleAddClose = useCallback(() => setAddOpen(false),[]); //prop olarak addTodo component'a gidiyor
    
    const handleUpdateOpen = (id) => {
      setUpdateOpen(true);
      setTodoToUpdate(id);
    };

    const handleUpdateClose = useCallback(() => setUpdateOpen(false),[]); //prop olarak updateTodo component'a gidiyor
    
    const handleDelete = (id) => {
        const todo = todos.find((t)=> t._id === id);
        if(user.username === todo.byUsername){
          if (window.confirm(`Seçmiş olduğun Todo Silinecek!`)) {
            dispatch(deleteTodo(id));
          }
        }else{
          alert(`Bu Todo'yu Silmeye Yetkiniz Yok !`);
        }
    };

    const handleToggle = (id) => {
      const todo = todos.find((t)=> t._id === id);
      if(user.username === todo.byUsername){
          dispatch(toggle(id));
      }else{
        alert(`Bu Todo'yu Bitirmeye Yetkiniz Yok !`);
      }
    }

    const handleToggleAll = () => { //user kontrolü sağlanması gerek daha yapılmadı*
        setToggleAll(!toggleAll)
        if(!toggleAll){
          dispatch(toggleAllDispatch(todos));
        }
        else if(toggleAll){
            dispatch(uncheckAll(todos))
        }
    }


    
  return (
    <ul className="todo-list">
      <div className='head'>
        <h2>Todolar</h2>
        <div className='buttons'>
          <button className='item btn' onClick={handleAddOpen}>Todo Ekle</button>
          <button className='item btn' onClick={handleToggleAll}>
            {toggleAll ? 'Tüm İşaretlemeleri Kaldır' : 'Tümünü Yapıldı Olarak İşaretle'}
          </button>
          <button className='item btn' onClick={() => dispatch(clearAllCompleted())}>Tamamlananları Temizle</button>
        </div>
      </div>

      {( searchedTodos[0] ? searchedTodos : filtered).map((todo) => (
        <li key={todo._id} >
            <div className='todo-content'>
              <div className={`title`}>
                  <label className={`${todo.status ? "completed" : ""}`}>
                    <Checkbox className="toggle" checked={todo.status}  onChange={() => {handleToggle(todo._id)}}/>
                    <h4>{todo.title} <span className='updated-todo'>{todo.updated ? '(Updated)' :null}</span></h4>
                  </label>
                 {todo.toBeCompDate ?  <span>Tamamlanması Gereken Tarih : {todo.toBeCompDate}</span> : null}
              </div>

              <p className={`${todo.status ? "completed" : ""} text`}>
               {todo.text ? todo.text : null}
              </p>

              <span className='info-text'>
                <span>
                  <b className='by-username'>
                    @{todo.byUsername}
                  </b> tarafından {todo.addedDate} tarihinde eklendi.
                </span>
                  
                <span className='dtbc'>
                  {
                  todo.endDate ? 
                    <b>Tamamlanan Tarih :{todo.endDate}</b>  
                  : null}
                </span>
              </span>
            </div>

            <div className='action-buttons'>
              <button className="icon"  onClick={() => handleUpdateOpen(todo._id)}>
                  <BiEditAlt color='#2a84dd'/>
              </button>
              <button className="icon" onClick={() => handleDelete(todo._id)}>
                  <VscChromeClose color='#b83434'/>
              </button>
            </div>
        </li>
      ))}

      <Modal
        name='addTodoModal'
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <b>Todo Ekle</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AddTodo closeModal={handleAddClose}/>
          </Typography>
        </Box>
      </Modal>

      <Modal
        name='updateModal'
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <b>Todo Düzenle </b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <UpdateTodo closeModal={handleUpdateClose} id={todoToUpdate}/>
          </Typography>
        </Box>
      </Modal>
    </ul>
  )
}
export default memo(TodoList);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'.2rem',
  boxShadow: 31,
  p: 4,
};