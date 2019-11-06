import React from 'react';
import moment from 'moment';

import { TrendingUp, TrendingDown } from '@material-ui/icons/'

import css from './RetangleInfo.module.sass';

const RetangloInfo = (props) => (
    <>
        <div className={css.Container}>
            <div className={css.C__Icon}>
                {props.type.type === "P" &&
                    <TrendingDown color="error" fontSize="large" />
                }
                {props.type.type === "A" &&
                    <TrendingUp className={css.C__IconGreen} fontSize="large" />
                }
            </div>
            <div className={css.C__Itens}>
                <div className={css.C__Info}>
                    <h4 className={css.C__Name}>{props.balance.name}</h4>
                    <h5 className={css.C__Value}>{Number(props.balance.value.toString().replace('-', ''))
                        .toLocaleString("pt-BR",
                            {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL'
                            })
                    }</h5>
                </div>
                <p>{moment().format('LL', props.balance.updatedAt)}</p>
            </div>
        </div>
    </>
)

export default RetangloInfo;