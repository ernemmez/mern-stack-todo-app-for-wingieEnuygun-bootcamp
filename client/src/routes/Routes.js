import React, {useEffect,memo} from 'react';
import {Routes as Router, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import { useSelector,useDispatch } from 'react-redux';
import { activeUser } from '../redux/user/userSlice';
import { startSession } from '../redux/user/userSlice';
import Cookies from 'js-cookie';
import NotFound404 from '../pages/404';
import Signup from '../pages/Signup';



function Routes() {
    const user = useSelector(activeUser);
    const dispatch = useDispatch();

    useEffect(() => { // didMount anı CookieUserSession Check
      const cookieUserSession = Cookies.get('user');
      
      if(cookieUserSession){ //cookie içerisinde bir user var ise

        const user = JSON.parse(cookieUserSession) //cokkie içerisinde ki  user'ı json parse ediyoruz
        dispatch(startSession(user)); //parse edilmiş user'ımız ile otomatik olarak login işlemimizi yaptırıyoruz.
      }
    },[dispatch]);


  return (
    <>
        <Router>
            <Route path="/" element={user ? <Home /> : <Login/>} />
            <Route path="/home" element={user ? <Home /> : <Login/>} />
            <Route path="/login" element={user ? <Home/> : <Login />} />
            <Route path="/about" element={user ? <About /> : <Login/>} />
            <Route path="/signup" element={user ? <Home /> : <Signup/>} />
            <Route path="*" element={<NotFound404/>} />
        </Router>
    </>
  )
}
export default memo(Routes);