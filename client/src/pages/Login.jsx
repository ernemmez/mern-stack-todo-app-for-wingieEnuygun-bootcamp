import React, {useState,memo} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../middleware/request/userReqs';
import { useFormik } from 'formik';
import { useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import { startSession } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';







function Login() {

  const dispatch = useDispatch();
  const [loginStatus,setLoginStatus] = useState(false);
  const [loginErr,setLoginErr] = useState(false);

  const {handleSubmit, handleChange, values} = useFormik({

    initialValues:{
      username:'',
      password:'',
      rememberMe:false
    },
    
    onSubmit: (values) => {
      login(values) //Backend'e login isteği atıyorum.
      .then(res => { //response geldiğinde
        console.log(res.message)
        setLoginStatus(!loginStatus)
        setTimeout(() => { //1.2 saniye sonra oturum başlayacak.Sebebi 1.2 saniye boyunca kilit iconu green olacak ve açılacak
            dispatch(startSession(res.user));
            setCookie(res.user)
        }, 1200);
      })
      .catch(() => setLoginErr(!loginErr))
    },
    // validationSchema,
    });

    const setCookie = (user) => {
      if(values.rememberMe){
          Cookies.set('user',JSON.stringify(user),{expires:10});
      }else{
          Cookies.remove('user');
      }
    }
  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{'backgroundColor':loginStatus ? '#32c15b' : loginErr ? '#bf1349' : ''}}>
            {loginStatus ? <LockOpenOutlinedIcon/> : <LockOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            Eren'in To-Do App'ine Hoşgeldiniz.
          </Typography>
          <Typography component="span" style={{color:loginErr ? '#bf1349' :loginStatus ? '#32c15b' : '#c2c2c2',fontSize:'.8rem'}}>
            {loginErr ? 'Geçersiz Kullanıcı Adı veya Parola.' : loginStatus ? 'Giriş Başarılı...' : 'Lütfen Giriş Yapınız.'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              value={values.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parola"
              type="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox name="rememberMe" id='rememberMe' value={values.rememberMe}  onChange={handleChange} color="primary" />}
              label="Beni Hatırla"
            />
            <Button type="submit" fullWidth variant="contained">
             Giriş Yap
            </Button>
          </Box>
          <Typography component="span" style={{color:'#c2c2c2',fontSize:'.8rem',textDecoration:'underline',marginTop:'1rem'}}>
            <Link to='/signup'>Sign Up</Link> <br />
            <a href='https://github.com/ernemmez' target='_blank' rel="noopener noreferrer">ernemmez</a>
          </Typography>
        </Box>
      </Container>
  );
}
export default memo(Login);