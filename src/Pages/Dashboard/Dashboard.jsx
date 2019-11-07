import React from 'react';
import RetangleInfo from '../../Components/RetangleInfo/RetangleInfo';
import Graphic from '../../Components/Graphic/Graphic';

import {
  Tabs,
  Tab,
  Typography,
  Box,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import ListCore from '@material-ui/core/List';
import { Redirect } from 'react-router-dom';
import {
  Home,
  List,
  GraphicEq,
  Add,
  // CreditCard,
  MonetizationOn,
  Remove
} from '@material-ui/icons';

import apiService from './../../Services/api.service';

import avatarPicture from './../../Assets/Images/user.png';
import css from './Dashboard.module.sass';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idUser: this.props.match.params.id,
      salutation: '',
      userName: '',
      wallet: [{}],
      valueTab: 0,
      open: false,
      selectedValue: false,
      redirect: false,
      passives30: 0,
      actives30: 0,
      params: '',
      balance: [],
      category: []
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/transaction/${this.state.params}/${this.state.idUser}`} />
    }
  };

  async componentDidMount() {
    const responseUser = await apiService.get(`/users/id?body=${this.state.idUser}`);
    const responseWallet = await apiService.get(`/wallet/id?body=${this.state.idUser}`);
    await this.setState({
      userName: responseUser.data[0].name,
      wallet: [{
        id: responseWallet.data[0].id,
        name: responseWallet.data[0].name,
        value: responseWallet.data[0].balance
      }]
    })
    const responseEconomic = await apiService.get(`/balance_twenty/id?body=${this.state.wallet[0].id}`);
    const responseBalance = await apiService.get(`/economic_balance/id?body=${this.state.wallet[0].id}`);
    const responseCategory = await apiService.get(`/category`);
    await this.setState({
      passives30: responseEconomic.data.passive,
      actives30: responseEconomic.data.ative,
      balance: responseBalance.data,
      category: responseCategory.data
    })
    this.getSalutation();
  };

  getSalutation() {
    const date = new Date().getHours();

    if (date <= 12) {
      this.setState({ salutation: 'Bom dia' });
    }
    if (date > 12 && date < 18) {
      this.setState({ salutation: 'Boa tarde' });
    }
    if (date >= 18) {
      this.setState({ salutation: 'Boa noite' });
    }

  };

  handleChangeTab = (event, newValue) => {
    this.setState({ valueTab: newValue });
  };

  handleClickOpen = () => {
    this.setState({ open: true })
  };

  handleClose = value => {
    this.setState({ open: false, selectedValue: value })
  };

  handleRedirect = value => {
    this.setState({ params: value, redirect: true })
  };

  render() {
    function SimpleDialog(props) {
      const { onClose, selectedValue, open, redirect } = props;

      const handleClose = () => {
        onClose(selectedValue);
      };

      const handleListItemClick = value => {
        redirect(value)
        onClose(value);
      };


      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle classes={{ root: `${css.ListCore}` }} id="simple-dialog-title">Oque vamos adicionar ?</DialogTitle>
          <ListCore classes={{ root: `${css.ListCore}` }}>
            {/* <ListItem button onClick={() => handleListItemClick('addWallet')}>
              <ListItemAvatar>
                <Avatar>
                  <CreditCard />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nova carteira" />
            </ListItem> */}
            <ListItem button onClick={() => handleListItemClick('addActive')}>
              <ListItemAvatar>
                <Avatar>
                  <Add color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Receita" />
            </ListItem>
            <ListItem button onClick={() => handleListItemClick('addPassive')}>
              <ListItemAvatar>
                <Avatar>
                  <Remove color="error" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText color="red" primary="Despesa" />
            </ListItem>
          </ListCore>
        </Dialog>
      );
    };

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
    };

    return (
      <div className={css.Container} >
        {this.renderRedirect()}
        <TabPanel value={this.state.valueTab} index={0}>
          <div className={css.Home}>
            <div className={css.H__User}>
              <div className={css.HU__Title}>
                <h1 className={css.HUT__Salutation}>{this.state.salutation},</h1>
                <h4 className={css.HUT__Name}>{this.state.userName}</h4>
                <p className={css.HUT__Logof} onClick={() => window.location.href = '/'}>
                  Você não é {this.state.userName}? Sair</p>
              </div>
              <Avatar alt={this.state.userName} src={avatarPicture} classes={{ root: `${css.HU__Picture}` }} />
            </div>
            <div className={css.C__Wallet}>
              <h2 className={css.CW__Name}>{this.state.wallet[0].name}</h2>
              <h4 className={css.CW__Value}>{Number(this.state.wallet[0].value)
                .toLocaleString("pt-BR",
                  {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL'
                  }
                )}
              </h4>
              <p className={css.CW__Lastdays}>ultimos 30 dias</p>
              <div className={css.CW__Movement}>
                <p className={css.CW__InputValues} >Entradas: {this.state.actives30
                  .toLocaleString("pt-BR",
                    {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL'
                    }
                  )}</p>
                <p className={css.CW__OutputValues}>
                  Despesas: {Number(this.state.passives30.toString().replace('-', ''))
                    .toLocaleString("pt-BR",
                      {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL'
                      })
                  }
                </p>
              </div>
            </div>
            <div className={css.C__Add}>
              <Fab
                color="primary"
                classes={{ root: `${css.CA__Button}` }}
                aria-label="add"
                onClick={this.handleClickOpen}
              >
                <Add />
              </Fab>
            </div>
            <SimpleDialog
              selectedValue={this.state.selectedValue}
              open={this.state.open}
              redirect={this.handleRedirect}
              onClose={this.handleClose}
            />
          </div>
        </TabPanel>
        <TabPanel value={this.state.valueTab} index={1}>
          {!this.state.balance.length &&
            <div className={css.balance}>
              <p className={css.LC_Text}>Adicione uma atividade para listamos aqui!</p>
              <MonetizationOn className={css.LC_Icon} />
            </div>
          }
          {this.state.balance.map((b, i) => {
            const type = this.state.category.find((c) => {
              if (c.id === b.idDefaultCategory) {
                return c.type
              }
            })
            return <RetangleInfo
              key={i}
              balance={b}
              idUser={this.state.idUser}
              type={type}
            />
          })}
        </TabPanel>
        <TabPanel value={this.state.valueTab} index={2}>
          <Graphic wallet={this.state.wallet} />
        </TabPanel>
        <div className={css.C__Tab}>
          <Tabs
            value={this.state.valueTab}
            onChange={this.handleChangeTab}
            classes={{ root: `${css.CT__Container}` }}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab icon={<Home />} label="Inicio" classes={{ root: `${css.CT__Itens}` }} />
            <Tab icon={<List />} label="Recentes" classes={{ root: `${css.CT__Itens}` }} />
            <Tab icon={<GraphicEq />} label="Analíse" classes={{ root: `${css.CT__Itens}` }} />
          </Tabs>
        </div>
      </div>
    );
  };
}
export default Dashboard;