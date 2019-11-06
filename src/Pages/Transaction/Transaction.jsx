import React from 'react';
import Wallet from './Types/Wallet/Wallet';
import Activity from './Types/Activity/Activity';

import css from './Transaction.module.sass';

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: this.props.match.params,
    }
  }

  render() {
    return (
      <div className={css.Container}>
        {
          this.state.params.param === 'addWallet' &&
          <Wallet />
        }
        {
          this.state.params.param !== 'addWallet'
          && <Activity type={this.state.params} />
        }
      </div>
    )
  }
}

export default Transaction