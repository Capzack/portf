import React from 'react';
import styled from 'styled-components'
import {Theme_input, Text, Submit_button, Theme_shadow_block} from '../styled/components.js'

export default function Filter(props){

  return(
    <Filter_container location={window.location.pathname}className='row justify-content-start gy-5 m-0'>
      <div className='col-12 p-0 mt-0'>
        <Text fs= '16px' className = 'row'>
          Минимальная сумма, ₽
        </Text>
        <div className = 'mt-2'>
          <Sum_from className = 'col-6 py-1' placeholder ='От'/>
          <Summ_to className = 'col-6  py-1' placeholder ='До'/>
        </div>
      </div>
      <div className='col-12 p-0'>
        <Text fs= '16px' className = 'row'>Ценная бумага</Text>
        <div className = 'mt-2'>
          <Theme_input className = 'col-6 py-1' placeholder ='Goog'/>
        </div>
      </div>
      <div className='col-12 p-0'>
        <Text fs= '16px' className = 'row'>Тип бумаги</Text>
        <div className = 'mt-2'>
          <Theme_input className = 'col-6 py-1' placeholder ='Акции РФ'/>
        </div>
      </div>
      <div className='col-12 p-0'>
        <Text fs= '16px' className = ''>Риск</Text>
        <div className = ' mt-2 align-items-center'>
          <div className = 'col-1 p-0 d-inline'>
            <Theme_input type='checkbox' />
          </div>
          <Text fs= '16px' className='col-9 ms-2 d-inline'>Умеренный</Text>
        </div>
        <div className = ' mt-2 align-items-center'>
          <div className = 'col-1 p-0 d-inline'>
            <Theme_input type='checkbox' />
          </div>
          <Text fs= '16px' className='col-9 ms-2 d-inline'>Консервативный</Text>
        </div>
        <div className = ' mt-2 align-items-center'>
          <div className = 'col-1 p-0 d-inline'>
            <Theme_input type='checkbox' />
          </div>
          <Text fs= '16px' className='col-9 ms-2 d-inline'>Агрессивный</Text>
        </div>
      </div>
      <div className='col-12 p-0'>
        <Text fs= '16px' className = ''>
          Минимальная сумма, %
        </Text>
        <div className = 'mt-2'>
          <Sum_from className = 'col-6 py-1' placeholder ='От'/>
          <Summ_to className = 'col-6 py-1' placeholder ='До'/>
        </div>
      </div>
      <Submit_button onClick={e=>submit(e)} className='col-8 p-2 mt-5 '>Применить</Submit_button>
    </Filter_container>
  )
}
const Filter_container =styled(Theme_shadow_block)`
  max-width: 300px;
  padding: 24px;
`

const Sum_from = styled(Theme_input)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`

const Summ_to = styled(Theme_input)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 0px;
`
