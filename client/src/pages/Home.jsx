import React, {useEffect,useReducer,useCallback,useMemo} from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TodoList from '../components/TodoList';
import { useDispatch, useSelector } from "react-redux";
import {getAllTodos} from '../middleware/request/todoReqs';
import {setTodos,todoS} from '../redux/todo/todoSlice';
import filterTodoReducer from '../middleware/todoFilterReducer'
import { activeUser } from '../redux/user/userSlice';
import { memo } from 'react';

 function Home() {
  const dispatch = useDispatch();
  const todos = useSelector(todoS);
  const user = useSelector(activeUser);

  const [state, filterDispatch] = useReducer(filterTodoReducer, {
    onlyMe: false,
    completed: false,
  })

  useEffect(() => {  //todolar için backend'e istekte bulunduk
    getAllTodos()
    .then(res => {
       const backendtodos = res;
       dispatch(setTodos(backendtodos));
    })
    .catch(err => console.log(err)); //todoları backend'den çağırdık.
      
  },[dispatch]);

  
  const handleCompleted = useCallback(value => {
    filterDispatch({
      type: 'UPDATE_COMPLETED',
      value
    })
  }, [])

  const handleOnlyMe = useCallback(() => {
    filterDispatch({
      type: 'ONLY_ME',
      payload: !state.onlyMe
    })
  }, [state.onlyMe])

  const filteredTodos = useMemo(() => todos.filter(todo => {
    return (
			state.onlyMe && user ? todo.byUsername === user.username : true
		) && (
			state.completed ? (
				state.completed === 'completed' ? todo.status : !todo.status
			) : true
		)

  }),[state.completed, state.onlyMe, todos, user])



  return (
    <div className='home'>
      <Header /> 
      <main>
        <aside className='sidebar'>
          <Sidebar  state={state} updateCompleted={handleCompleted}  updateOnlyMe={handleOnlyMe}/>
        </aside>
          <section className='content'>
            <TodoList filtered={filteredTodos} />
          </section>
      </main>
    </div>
  )
}
export default memo(Home);