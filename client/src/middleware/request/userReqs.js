import {get,post} from './index';


export const getAllUsers = () => get('auth/users');
export const getUserById = (id) => get(`auth/users/${id}`);
export const login = (data) => post('auth/user/login',data);
export const signup = (data) => post('auth/user/createAccount',data);