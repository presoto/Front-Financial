import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Wallet from './Types/Wallet/Wallet';
import Activity from './Types/Activity/Activity';
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
      redirect: false,
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />
    }
  };


  render() {
    return (
      <div className={css.Container}>
        {this.renderRedirect()}
        {
          this.state.params.param === 'addWallet' &&
          <Wallet />
        }
        {
          this.state.params.param !== 'addWallet'
          && <Activity type={this.state.params.param} />
        }
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
            onClick={() => this.setState({redirect: true})}
          >
            <Close /> Cancelar
          </Button>
        </div>
      </div>
    )
  }
}

export default Transaction