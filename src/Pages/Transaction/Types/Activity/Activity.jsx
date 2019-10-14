import React from 'react';
import DatePicker from 'react-datepicker';

import { TextField, } from '@material-ui/core';

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
    };
    this.inputDate = this.inputDate.bind(this);
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


  render() {
    return (
      <div className={css.Container}>
        <h4 className={css.C__Title}>Vamos cadastrar uma nova {this.props.type === 'addActive' ?
          'Receita :)' : 'Despesa ):'}
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
          // value={this.state.customerType}
          // onChange={this.handleChange}
          label="Categoria"
        >
          {/* {this.state.customerList.map((state: { id?: number, description?: string }) => (
            <MenuItem key={state.id} value={state.id}>
              {state.description}
            </MenuItem>
          ))} */}
        </TextField>
        {this.props.type === 'addPassive' &&
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

      </div>
    );
  }

};

export default Activity;