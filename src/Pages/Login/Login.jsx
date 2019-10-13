import React from 'react';
import { Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Fab, Checkbox, Avatar } from '@material-ui/core';
import { Navigation } from '@material-ui/icons';
import logo from './../../Assets/Images/icon-finance.png';

import apiService from './../../Services/api.service';
import Loading from './../../Components/Loading/Loading'

import clsx from 'clsx';
import css from './Login.module.sass';

const useStyles = makeStyles({
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

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      id_user: 0,
      redirect: false,
      userInvalid: false,
      loading: false
    }
    this.validateUser = this.validateUser.bind(this)
  }

  async validateUser() {
    this.setState({ userInvalid: false, loading: true })
    const { email, password } = this.state
    const body = { email, password }

    const response = await apiService.get('/login', body, 10000)

    response.data.length > 0 ?
      this.setState({ redirect: true, loading: false, id_user:response.data[0].id  }) :
      this.setState({ userInvalid: true, loading: false })

  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/Dashboard/${this.state.id_user}`}  />
    }
  }

  render() {
    return (
      <div className={css.Login}>
        <Loading visible={this.state.loading} />
        {this.renderRedirect()}
        <div className={css.L__User}>
          <Avatar alt={this.state.userName} src={logo} />

          <h4 className={css.LU__Welcome}>Bem vindo ao seu</h4>
          <h4 className={css.LU__Welcome}><strong>Gerenciador Financeiro</strong> !</h4>

          <div className={css.LU__Form}>
            <TextField
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              variant="filled"
              label="Usuario"
            />
            <TextField
              variant="filled"
              type="password"
              label="Senha"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <div className={css.LUF__Options}>
              {this.state.userInvalid &&
                <p className={css.LUFO__InvalidUser}>Usuario ou senha invalidos</p>
              }
              <div className={css.LUFO__Check}>
                <StyledCheckbox defaultChecked />
                <p>Manter-se conectado</p>
              </div>
              <p className={css.LUFO__ForgetPassword}>Ainda não possui uma conta?</p>
            </div>
            <Fab
              variant="extended"
              aria-label="delete"
              className={css.fab}
              disabled={!(this.state.email && this.state.password)}
              onClick={this.validateUser}>
              <Navigation className={css.extendedIcon} />
              Entrar
         </Fab>
          </div>
        </div>
      </div>
    );
  };
}

export default Login;