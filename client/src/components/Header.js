import React, { memo, useState } from 'react';
import {Link} from 'react-router-dom'
import Search from './Search';
import Avatar from '@mui/material/Avatar';
import { destroySession } from '../redux/user/userSlice';
import {  useDispatch , useSelector } from 'react-redux';
import { activeUser } from '../redux/user/userSlice';
import Button from '@mui/material/Button';


 function Header() {
    const dispatch = useDispatch();
    const user = useSelector(activeUser);
    const [showOptions,setShowOptions] = useState(false);

  return (
    <header className='header'>
      <div className='item'>
        <Link to='/home'>
          <h3>Eren To-Do App</h3>
        </Link>
      </div>
      <div className='item'>
        <Search />
      </div>
      <div className='item'>
        <span className='username'>{user.username}</span>
        <Avatar
          className='user-avatar'
          alt="user" 
          src="https://wikiimg.tojsiabtv.com/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg"
          onClick={()=> setShowOptions(!showOptions)}
           />
        {
          showOptions ? 
          <div className='user-options'>
            <ul>
              <li>
                <Button type="button" fullWidth variant="contained" onClick={()=> dispatch(destroySession())}>
                   Çıkış Yap
                </Button>
              </li>
            </ul>
          </div>
          : null
        }
      </div>
    </header>
  )
}
export default memo(Header);