import React from 'react';

import { Tabs, Tab } from '@material-ui/core';
import { Home, List, GraphicEq } from '@material-ui/icons';

import css from './Dashboard.module.sass';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'gabriel',
      wallet: [{ name: 'santander', value: 550 }, { name: 'nubank', value: -200 }],
      valueTab: 0,
    }
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ valueTab: newValue });
  };

  render() {
    return (
      <div className={css.Container} >
        <div className={css.C__Tab}>
          <Tabs
            value={this.state.valueTab}
            onChange={this.handleChangeTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab icon={<Home />} label="Inicio" />
            <Tab icon={<List />} label="Recentes" />
            <Tab icon={<GraphicEq />} label="Analíse" />
          </Tabs>
        </div>
      </div>
    )

  }
}
export default Dashboard;