import React from 'react';

import { TrendingUp, TrendingDown } from '@material-ui/icons/'

import css from './RetangleInfo.module.sass';

const RetangloInfo = (props) => (
    <div className={css.Container}>
        <div  className={css.C__Icon}>
        <TrendingDown color="error" fontSize="large"/>
        </div>
        <div className={css.C__Itens}>
            <div className={css.C__Info}>
                <h4 className={css.C__Name}>Supermercado</h4>
                <h5 className={css.C__Value}>R$ 100,00</h5>
            </div>
            <p>27/08/2019</p>
        </div>
    </div>
)

export default RetangloInfo;