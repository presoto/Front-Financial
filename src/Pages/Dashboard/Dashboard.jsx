import React from 'react';

import { Tabs, Tab, Typography, Box, Avatar } from '@material-ui/core';
import { Home, List, GraphicEq } from '@material-ui/icons';

import avatarPicture from './../../Assets/Images/user.png';
import css from './Dashboard.module.sass';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salutation: '',
      userName: 'Gabriel',
      wallet: [{ name: 'santander', value: 550 }, { name: 'nubank', value: -200 }],
      valueTab: 0,
    }
  }

  componentDidMount() {
    this.getSalutation();
  }

  getSalutation() {
    const date = new Date().getHours();

    if (date <= 12) {
      this.setState({ salutation: 'Bom dia' });
    }
    if (date < 18) {
      this.setState({ salutation: 'Boa tarde' });
    }
    if (date >= 18) {
      this.setState({ salutation: 'Boa noite' });
    }

  }

  handleChangeTab = (event, newValue) => {
    this.setState({ valueTab: newValue });
  };

  render() {
    return (
      <div className={css.Container} >
        <TabPanel value={this.state.valueTab} index={0}>
          <div className={css.Home}>
            <div className={css.H__User}>
              <div className={css.HU__Title}>
                <h1 className={css.HUT__Salutation}>{this.state.salutation},</h1>
                <h4 className={css.HUT__Name}>{this.state.userName}</h4>
              </div>
              <Avatar alt={this.state.userName} src={avatarPicture} classes={{ root: `${css.HU__Picture}` }} />
            </div>
            <div className={css.C__Wallet}>
              <h2>{this.state.wallet[0].name}</h2>
              <h4>R$ 1250</h4>
              <p>ultimos 30 dias</p>
              <p>Entradas: R$1450</p>
              <p>Despesas: R$200</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={this.state.valueTab} index={1}>
          Calma Claudio, aqui ainda não tem nada ...
        </TabPanel>
        <TabPanel value={this.state.valueTab} index={2}>
          Nem aqui
        </TabPanel>
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