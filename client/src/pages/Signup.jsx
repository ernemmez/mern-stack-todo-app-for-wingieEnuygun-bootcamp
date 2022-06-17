import React, {useState,memo} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signup } from '../middleware/request/userReqs';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useNavigate } from "react-router-dom"






function Login() {

  const navigate = useNavigate();
  const [signupStatus,setsignupStatus] = useState(false);
  const [signupErr,setSignupErr] = useState(false);

  const {handleSubmit, handleChange, values} = useFormik({

    initialValues:{
      username:'',
      password:''
    },
    
    onSubmit: (values) => {
      signup(values) //Backend'e login isteği atıyorum.
      .then(res => { //response geldiğinde
        console.log(res.message)
        setsignupStatus(!signupStatus)
        setTimeout(() => { //1.2 saniye sonra login'e yönlendir.Sebebi 1.2 saniye boyunca kilit iconu green olacak ve açılacak
          navigate('/login', { replace: true})
        }, 1200);
      })
      .catch(() => setSignupErr(!signupErr))
    },
    // validationSchema,
    });

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
          <Avatar style={{'backgroundColor':signupStatus ? '#32c15b' : signupErr ? '#bf1349' : ''}}>
            {signupStatus ? <LockOpenOutlinedIcon/> : <LockOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            Eren'in To-Do App'ine Hoşgeldiniz.
          </Typography>
          <Typography component="span" style={{color:signupErr ? '#bf1349' :signupStatus ? '#32c15b' : '#c2c2c2',fontSize:'.8rem'}}>
            {signupErr ? 'Bir Hata Oluştu' : signupStatus ? 'Kayıt Başarılı...' : 'Lütfen Kayıt Olunuz.'}
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
            <Button type="submit" fullWidth variant="contained">
             Kayıt Ol
            </Button>
          </Box>
          <Typography component="span" style={{color:'#c2c2c2',fontSize:'.8rem',textDecoration:'underline',marginTop:'1rem'}}>
            <Link to='/login'>Login</Link> <br />
            <a href='https://github.com/ernemmez' target='_blank' rel="noopener noreferrer">ernemmez</a>
          </Typography>
        </Box>
      </Container>
  );
}
export default memo(Login);