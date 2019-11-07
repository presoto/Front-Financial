import React from 'react';
import moment from 'moment';

import apiService from './../../Services/api.service';


import { TrendingUp, TrendingDown, DeleteForever } from '@material-ui/icons/'

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
                <div className={css.C__Footer}>
                    <p>{moment().format('LL', props.balance.updatedAt)}</p>
                    <DeleteForever className={css.CF__Icon} onClick={() => apiService.delete(`/balance/id?idWallet=${props.balance.idWallet}&id=
                     ${props.balance.id}&action=${props.type.type}&value=${Number(props.balance.value.toString().replace('-', ''))}`, 10000).then(
                        window.location.href = `/Dashboard/${props.idUser}`
                     )
                    } />
                </div>
            </div>
        </div>
    </>
)

export default RetangloInfo;