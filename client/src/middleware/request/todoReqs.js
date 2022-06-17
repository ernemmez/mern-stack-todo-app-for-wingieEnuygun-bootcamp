import {get,post,put,del} from './index';

export const getAllTodos = () => get('todos/');
export const getTodoById = (id) => get(`todos/${id}`);
export const addTodoReq = (data) => post('todos/add',data);
export const deleteTodoReq = (id) => del(`todos/delete/${id}`);
export const updateTodoReq = (id,data) => put(`todos/update/${id}`,data);