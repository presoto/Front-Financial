import React from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import { TextField, MenuItem } from '@material-ui/core';
import apiService from './../../../../Services/api.service';
import { Close, Check } from '@material-ui/icons';

import Loading from './../../../../Components/Loading/Loading';

import 'react-datepicker/dist/react-datepicker.css';
import css from './Activity.module.sass';

class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      name: '',
      date: '',
      recurrence: 1,
      category: [],
      value: '',
      wallet: [],
      idCategory: 0,
      redirect: false,
      idWallet: 0,
      loading: false

    };
    this.inputDate = this.inputDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newBalance = this.newBalance.bind(this);
  };

  async componentDidMount() {
    const responseCategory = await apiService.get('/category');
    const responseWallet = await apiService.get(`/wallet/id?body=${this.props.type.id}`);
    this.setState({ category: responseCategory.data, idWallet: responseWallet.data[0].id })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/Dashboard/${this.props.type.id}`} />
    }
  };


  inputDate() {
    return (
      <div className={css.hackingDatePicker}>
        <DatePicker
          className={css.C__Date}
          name="date"
          selected={this.state.date}
          onChange={date => this.setState({ date })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data da transação"
          isClearable={true}
          withPortal
        />
      </div>
    )
  }
  handleChange(e) {
    const { name, value } = e.target
    const change = []
    change[name] = value

    this.setState(change)
  }

  async newBalance() {
    this.setState({ loading: true })
    await apiService.post('/economic_balance', {
      idWallet: this.state.idWallet,
      idCategory: null,
      idDefaultCategory: this.state.idCategory,
      name: this.state.name,
      date: this.state.date,
      recurrence: this.state.recurrence,
      value: this.props.type.param === 'addActive' ? this.state.value : this.state.value * -1,
      totalValue: this.state.value * this.state.recurrence,
    }).then(res => this.setState({ loading: false, redirect: true}))
  }
  render() {
    return (
      <div className={css.Container}>
        {this.renderRedirect()}
        <h4 className={css.C__Title}>Vamos cadastrar uma nova {this.props.type.param === 'addActive' ?
          'Receita !' : 'Despesa !'}
        </h4>
        <TextField
          label="Nome da transação"
          className={css.C__Text}
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="number"
          label="Valor R$"
          className={css.C__Text}
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          select
          className={css.C__Text}
          margin="normal"
          variant="outlined"
          value={this.state.idCategory}
          onChange={this.handleChange}
          name="idCategory"
          label="Categoria"
        >
          {this.props.type.param === 'addActive' &&
            this.state.category.map((category, i) => {
              if (category.type === 'A') {
                return <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
              }
            })}
          {this.props.type.param === 'addPassive' &&
            this.state.category.map((category, i) => {
              if (category.type === 'P') {
                return <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
              }
            })}
        </TextField>
        {this.props.type.param === 'addPassive' &&
          <TextField
            type="number"
            label="Numero de parcelas"
            className={css.C__Text}
            value={this.state.recurrence}
            onChange={(e) => this.setState({ recurrence: e.target.value })}
            margin="normal"
            variant="outlined"
          />
        }
        <TextField
          className={css.CF__Field}
          classes={{ root: `${css.CFF_TextFieldRoot}` }}
          margin="normal"
          variant="outlined"
          id="formatted-dataStart-input"
          InputProps={{ inputComponent: this.inputDate }}
        />
        <div className={css.C__Footer}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.newBalance}
          >
            <Check />
            Salvar
         </Button>
          <Button
            className={css.CF__ButtonCancel}
            color="secondary"
            variant="contained"
            onClick={() => this.setState({ redirect: true })}
          >
            <Close /> Cancelar
          </Button>
        </div>
        <Loading visible={this.state.loading} />
      </div>
    );
  }

};

export default Activity;