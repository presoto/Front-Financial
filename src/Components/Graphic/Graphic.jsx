import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import {
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import calculo from './../../Assets/Images/calculo.png';
import apiService from './../../Services/api.service';

import css from './Graphic.module.sass';



class Graphic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      periodo: 0,
      category: [],
      responseGraphic: [],
      receita: 0,
      despesa: 0,
      data2: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.graphicValidate = this.graphicValidate.bind(this);
  }

  async componentDidMount() {
    const category = await apiService.get('/category');
    this.setState({ category: category.data })
  }

  async handleChange(e) {
    const { name, value } = e.target
    const change = []
    change[name] = value
    if (name === 'periodo') {
      await this.setState(change)
      const responseGraphic = await apiService
        .get(`/balance/id?id=${this.props.wallet[0].id}&days=${this.state.periodo}`, 10000)
      this.setState({ responseGraphic, receita: 0, despesa: 0 })
      this.graphicValidate()
      return
    }
    this.setState(change)
  }

  graphicValidate() {
    const { responseGraphic, category } = this.state
    responseGraphic.data.filter((g) =>
      category.map((c) => {
        if (g.idDefaultCategory === c.id) {
          g.catName = c.name
          g.catActive = c.type
        }
      })
    )
    responseGraphic.data.forEach((r) => {
      if (r.catActive === 'A') {
        this.setState({ receita: this.state.receita + r.value })
      } else {
        this.setState({ despesa: Number((this.state.despesa + r.value).toString().replace('-', '')) })
      }
    })
  }
  render() {
    // gera uma cor aleatória em hexadecimal
    function gera_cor() {
      var hexadecimais = '0123456789ABCDEF';
      var cor = '#';

      // Pega um número aleatório no array acima
      for (var i = 0; i < 6; i++) {
        //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
      }
      return cor;
    }
    const data = [
      { name: 'Receitas', Receitas: this.state.receita, amt: 9900 },
      { name: 'Despesas', Despesas: this.state.despesa, amt: 9900 },
    ];

    if (this.state.responseGraphic.length !== 0) {

console.log('aqui: ', this.state.responseGraphic.data.map((e) => console.log(e)
  // e.name = e.catActive
  // e.uv = e.value
  // e.fill = e.catActive === 'A' ? 'green' : 'red'
))


      // this.setState({
      //   data2: this.state.responseGraphic.data.map((e) => {
      //     e.name = e.catActive
      //     e.uv = e.value
      //     e.fill = e.catActive === 'A' ? 'green' : 'red'
      //   })
      // })
    }


    // catActive: "A"
    // catName: "Bonus"
    // createdAt: "2019-11-07T10:35:31.394Z"
    // date: "2019-11-07T03:00:00.000Z"
    // id: 61
    // idCategory: null
    // idDefaultCategory: 2
    // idWallet: 8
    // name: "hr extra"
    // recurrence: 1
    // totalValue: 900
    // updatedAt: "2019-11-07T10:35:31.394Z"
    // value: 900

    const data3 = [
      {
        "name": "luz",
        "uv": 100,
        "fill": gera_cor()
      },
      {
        "name": "agua",
        "uv": 100,
        "fill": gera_cor()
      },
      {
        "name": "salario",
        "uv": 100,
        "fill": gera_cor()
      },
      {
        "name": "outros",
        "uv": 800,
        "fill": gera_cor()
      },
      {
        "name": "bonus",
        "uv": 200,
        "fill": gera_cor()
      },
      {
        "name": "roupas",
        "uv": 100,
        "fill": gera_cor()
      },
      {
        "name": "financiamento",
        "uv": 300,
        "fill": gera_cor()
      }
    ]

    const periodo = [
      {
        description: 'Selecione um periodo',
        value: 0
      },
      {
        description: '1 Dia',
        value: 1
      },
      {
        description: '15 Dias',
        value: 15
      },
      {
        description: '30 Dias',
        value: 30
      },
      {
        description: '60 Dias',
        value: 60
      },
      {
        description: '90 Dias',
        value: 90
      },
      {
        description: 'Completo',
        value: 9999
      },
    ]

    return (
      <div className={css.Content}>
        <div className={css.C__Filter}>
          <h1 className={css.C__Title}>Análise grafica</h1>
          <TextField
            select
            className={css.CF__Text}
            margin="normal"
            color="primary"
            variant="outlined"
            value={this.state.periodo}
            onChange={this.handleChange}
            name="periodo"
          >
            {periodo.map((p, i) => <MenuItem key={i} value={p.value}>{p.description}</MenuItem>)}
          </TextField>
        </div>
        {this.state.periodo === 0 &&
          <>
            <h4 className={css.C__H4}>Para gerar o relatorio primeiro você deve selecionar um filtro.</h4>
            <h5 className={css.C__H5}>Atenção: O grafico é plotado com base nas suas atividades cadastradas juntamente filtradas pelo periodo selecionado.</h5>
          </>
          // <img className={css.Img} src={calculo} alt="calculo" width="100px" height="100px" />
        }
        {this.state.periodo !== 0 &&
          <>
            <BarChart width={330} height={250} data={data} className={css.C__Filter}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Receitas" fill="#82ca9d" />
              <Bar dataKey="Despesas" fill="#db0234" />
            </BarChart>

            <RadialBarChart
              width={380}
              height={250}
              innerRadius="10%"
              outerRadius="80%"
              data={this.state.data2}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
              <Legend iconSize={15} width={130} height={140} layout='vertical' verticalAlign='middle' align="left" />
              <Tooltip />
            </RadialBarChart>
          </>
        }
      </div>
    );
  };
}

export default Graphic;