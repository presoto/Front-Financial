import React from 'react'
import PropTypes from 'prop-types'


import CircularProgress from '@material-ui/core/CircularProgress'

import classNames from 'classnames'
import css from './Loading.module.sass'

const propTypes = {
  /**
   * A propriedade `visible` controla o estado de exibição do componente `<Loading />`, esperando um valor `boolean` para isso.
   * 
   * @type _boolean_
   * @author _Gabriel Presoto_
   */
  visible: PropTypes.bool.isRequired
}

const Loading = (props) => {
  const loadingClass = classNames(css.Loading, {
    [css.isVisible]: props.visible
  })

  return (
    <div className={ loadingClass }>
      <CircularProgress />
      <p className={ css.L__Info }>Carregando...</p>
    </div>
  )
}

Loading.propTypes = propTypes
export default Loading
