import React from 'react';
import { TextField } from '@material-ui/core';

import css from './Activity.module.sass';

class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      name: '',
      date: '',
      recurrence: '',
      category: [],
      value: '',
      wallet: [],

    };
  };

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
          onChange={(e) => this.setState({ valueInitial: e.target.value })}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }

};

export default Activity;