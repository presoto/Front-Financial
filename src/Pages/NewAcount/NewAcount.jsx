import React from 'react';
import { Redirect } from 'react-router-dom';
import apiService from './../../Services/api.service';

import DatePicker from 'react-datepicker';
import { TextField, Button } from '@material-ui/core';
import { Close, Check, ArrowForwardIos } from '@material-ui/icons';
import Loading from './../../Components/Loading/Loading'


import 'react-datepicker/dist/react-datepicker.css';
import css from './NewAcount.module.sass';


class NewAcount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      email: '',
      date_birth: '',

      descriptionWallet: '',
      valueWallet: '',

      redirect: false,
      registerSuccess: false,
      step: 0,
      id_user: undefined,

      loading: false,
      erroRegisterUser: false
    }
    this.inputDate = this.inputDate.bind(this);
    this.next = this.next.bind(this);
  }

  inputDate() {
    return (
      <div className={css.hackingDatePicker}>
        <DatePicker
          className={css.C__Date}
          name="date"
          selected={this.state.date_birth}
          onChange={date_birth => this.setState({ date_birth })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de nascimento"
          isClearable={true}
          withPortal
        />
      </div>
    )
  }

  renderRedirect() {
    const { redirect, registerSuccess, id_user } = this.state;

    if (redirect && !registerSuccess) {
      return <Redirect to='/' />
    };
    if (redirect && registerSuccess) {
      return <Redirect to={`/Dashboard/${id_user}`} />
    };
  }

  async next() {
    this.setState({ loading: true, erroRegisterUser: false })
    if (this.state.step === 0) {
      const { name, email, password, date_birth } = this.state
      await apiService.post('/users', {
        name,
        email,
        password,
        date_birth
      }).then(res => this.setState({ id_user: res.data.id, step: 1, loading: false })
      ).catch(err => this.setState({ erroRegisterUser: true, loading: false })
      )
    };
    if (this.state.step === 1) {
      await apiService.post('/wallet', {
        name: this.state.descriptionWallet,
        balance: this.state.valueWallet,
        id_user: this.state.id_user,
      }).then(res => this.setState({ registerSuccess: true, redirect: true, loading: false })
      ).catch(err => this.setState({ erroRegisterUser: true, loading: false })
      )
    }
  };

  render() {
    return (
      <div className={css.Container}>
        <Loading visible={this.state.loading} />
        {this.renderRedirect()}
        {this.state.step === 0 &&
          < div className={css.C__User}>
            <h4 className={css.CU__Title}>Você está a poucos passo de descomplicar suas finanças :)</h4>
            <div className={css.CU__Form}>
              <TextField
                label="Nome ou apelido"
                className={css.C__Text}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                className={css.C__Text}
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                margin="normal"
                variant="outlined"
              />
              <TextField
                variant="outlined"
                type="password"
                label="Senha"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <TextField
                className={css.CF__Field}
                classes={{ root: `${css.CFF_TextFieldRoot}` }}
                margin="normal"
                variant="outlined"
                id="formatted-dataStart-input"
                InputProps={{ inputComponent: this.inputDate }}
              />
              {this.state.erroRegisterUser &&
                <p className={css.CU__Error}>Erro: Email já cadastrado!</p>
              }
              <div className={css.CU__Footer}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={(
                    !this.state.name || !this.state.email ||
                    !this.state.password || !this.state.date_birth
                  )}
                  onClick={this.next}
                >
                  Avançar
                <ArrowForwardIos />
                </Button>
                <Button
                  className={css.CUF__ButtonCancel}
                  color="secondary"
                  variant="contained"
                  onClick={() => this.setState({ redirect: true })}
                >
                  <Close /> Cancelar
            </Button>
              </div>
            </div>
          </div>
        }
        {this.state.step === 1 &&
          <div className={css.C__User}>
            <div className={css.CU__Title}>
              Agora vamos cadastrar uma carteira.
            </div>
            <div className={css.CU__Form}>
              <TextField
                label="Nome da carteira"
                className={css.C__Text}
                value={this.state.descriptionWallet}
                onChange={(e) => this.setState({ descriptionWallet: e.target.value })}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Saldo inicial"
                type="number"
                className={css.C__Text}
                value={this.state.valueWallet}
                onChange={(e) => this.setState({ valueWallet: e.target.value })}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div className={css.CU__Footer}>
              <Button
                color="primary"
                variant="contained"
                disabled={(
                  !this.state.valueWallet || !this.state.descriptionWallet
                )}
                onClick={this.next}
              >
                Avançar
                <ArrowForwardIos />
              </Button>
            </div>
          </div>
        }
      </div >
    );
  };
}

export default NewAcount;