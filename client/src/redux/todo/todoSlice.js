import { createSlice} from "@reduxjs/toolkit";
import {addTodoReq,deleteTodoReq,updateTodoReq} from '../../middleware/request/todoReqs';



export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos:[],
    filteredTodos:false,
  },
  reducers: {
    setTodos: (state, action) => {
     state.todos = action.payload;
    },
    addTodo: (state,action) => {
      state.todos.push(action.payload); //state içerisine ekliyoruz
      addTodoReq(action.payload).then(res => res).catch(err => err)  //backend'e gönderiyoruz
    },
    deleteTodo:(state,action) => {
      deleteTodoReq(action.payload).then(res => res).catch(err => err); //backend içerisinden siliyoruz
      state.todos = state.todos.filter((todo) => todo._id !== action.payload); //state içerisinden siliyoruz.
    },
    clearAllCompleted:(state) => {
      const willBeClearedTodos = state.todos.filter((t)=> t.status === true); //todos'umuz içerisinden silinecek todoları buluyoruz ve yeni bir dizi oluşturuyoruz.
      
      state.todos = state.todos.filter((t)=> t.status === false) //todos içerisinde status'ü false olan todolardan yeni bir dizi oluşturup onu todos'a eşitliyoruz.

      // eslint-disable-next-line array-callback-return
      willBeClearedTodos.map((todo)=> { //silinecek todolarımızı mapliyoruz
        deleteTodoReq(todo._id).then(res => res).catch(err => err); //her bir todo için backend'e delete requesti atıyoruz.
      });
    },
    updateTodo:(state,action) => {
      const todo = state.todos.find((t) => t._id === action.payload._id); 
        if(todo){//state içerisinde payloaddan gelen id'ye sahip todo var ise

          updateTodoReq(action.payload._id,action.payload).then(res => res).catch(err => err);  //Backenden Todoyu güncelledi.
          
          const t = state.todos.indexOf(todo,0); //todo'nun indexi alındı ve t değişkenine eşitlendi
         
          state.todos[t] = action.payload // todos'içindeki t. eleman'ı payload objesine eşitlendi.
        }else{alert('Bir Hata Oluştu')}
    },
    toggle:(state,action) => {
      const todo = state.todos.find((t) => t._id === action.payload); 
       if (todo) { //state içerisinde payloaddan gelen id'ye sahip todo var ise
        updateTodoReq(action.payload,{...todo,status:!todo.status}).then(res => res).catch(err => err);  //Backenddeki status'ü güncelliyor
         todo.status = !todo.status;  
      }
    },
    toggleAll: (state,action) => {  
      // eslint-disable-next-line array-callback-return
      state.todos.map((todo) => {
        todo.status = true;
        updateTodoReq(todo._id,{...todo,status:true}).then(res => res).catch(err => err);  //Backenddeki status'ü true yapıyor
      })
      
    },
    uncheckAll:(state,action) => {
      // eslint-disable-next-line array-callback-return
      state.todos.map((todo) => {
        todo.status = false
        updateTodoReq(todo._id,{...todo,status:false}).then(res => res).catch(err => err);  //Backenddeki status'ü false yapıyor
      })
    },
    searchTodos:(state,action) => {
      //  state.filteredTodos = state.todos.filter(todo => {return (todo.title && todo.username && todo.text ).toLocaleLowerCase('TR').includes(action.payload.toLocaleLowerCase('TR'))})

       const titleSearch = state.todos.filter(todo => {return todo.title.toLocaleLowerCase('TR').includes(action.payload.toLocaleLowerCase('TR'))})
       const textSearch = state.todos.filter(todo => {return todo.text.toLocaleLowerCase('TR').includes(action.payload.toLocaleLowerCase('TR')) })
       const userSearch = state.todos.filter(todo => {return todo.byUsername.toLocaleLowerCase('TR').includes(action.payload.toLocaleLowerCase('TR'))})

       if(titleSearch.length > 0) { //title'a uyuyorsa
        state.filteredTodos = titleSearch
       } else if(textSearch.length > 0){ // text'e uyuyorsa
        state.filteredTodos = textSearch
       } else if (userSearch.length > 0){ //user'a uyuyorsa
          state.filteredTodos = userSearch
       }
    }
  }
});


export const todoS = (state) => state.todos.todos;
export const filteredTodoS = (state) => state.todos.filteredTodos;
export const {
  addTodo,
  toggle,
  deleteTodo,
  setTodos,
  updateTodo,
  toggleAll,
  uncheckAll,
  clearAllCompleted,
  searchTodos
} = todoSlice.actions;

export default todoSlice.reducer;