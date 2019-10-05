import React from 'react';
import { Button } from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';

import css from './Transaction.module.sass';

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Restaurante',
      value: '19,90',
      date: '28/08/2019',
      recurrence: 0,
      params: this.props.match.params,
    }
  }

  render() {
    console.log(this.state.params)
    return (
      <div className={css.Container}>
        <div className={css.C__Footer}>
          <Button
            color="primary"
            variant="contained"
          >
            <Check />
            Salvar
         </Button>
          <Button
            className={css.CF__ButtonCancel}
            color="secondary"
            variant="contained"
          >
            <Close /> Cancelar
          </Button>
        </div>
      </div>
    )
  }
}

export default Transaction