import React from 'react';
import { TextField } from '@material-ui/core';

import css from './Wallet.module.sass';

class Wallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      valueInitial: 0
    };
  };

  render() {
    return (
      <div className={css.Container}>
        <h4 className={css.C__Title}>Uhull, vamos cadastrar uma nova carteira :)</h4>
          <TextField
            label="Nome da carteira"
            className={css.C__Text}
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
            <TextField
            type="number"
            label="Valor inicial"
            className={css.C__Text}
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
      </div>
    );
  }

};

export default Wallet;