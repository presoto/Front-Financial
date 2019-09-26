import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, TextField, IconButton, InputAdornment, Fab, Checkbox } from '@material-ui/core';
import { Navigation } from '@material-ui/icons';

import User from './../../Assets/Images/user.png';

import clsx from 'clsx';
import css from './Login.module.sass';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const Login = () => {
  const classes = useStyles();
  return (
    <div className={css.Login}>
      <div className={css.L__User}>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="User" src={User} className={classes.bigAvatar} />
        </Grid>
        <h4 className={css.LU__Welcome}>Bem vindo de volta, <strong>Gabriel</strong> !</h4>
        <div className={css.LU__Form}>
          <TextField
            variant="filled"
            label="Usuario"
          />
          <TextField
            variant="filled"
            // type={values.showPassword ? 'text' : 'password'}
            label="Senha"
            // value={values.password}
            // onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  >
                    {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={css.LUF__Options}>
            <div className={css.LUFO__Check}>
              <StyledCheckbox defaultChecked />
              <p>Manter-se conectado</p>
            </div>
            <p className={css.LUFO__ForgetPassword}>Esqueceu sua senha?</p>
          </div>
          <Fab variant="extended" aria-label="delete" className={css.fab}>
            <Navigation className={css.extendedIcon} />
            Entrar
         </Fab>
        </div>
      </div>
    </div>
  );
};

export default Login;