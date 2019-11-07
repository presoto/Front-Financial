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

import {
  ArrowUpwardOutlined
} from '@material-ui/icons';

import css from './Graphic.module.sass';



class Graphic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      periodo: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
    const change = []
    change[name] = value

    this.setState(change)
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
      { name: 'Receitas', Receitas: 2400, amt: 2400 },
      { name: 'Despesas', Despesas: 1398, amt: 2210 },
    ];

    const data2 = [
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
        value: 999
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
            <img className={css.Img} src={calculo} alt="calculo" width="300px" height="500px"/>
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
              data={data2}
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