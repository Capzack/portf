import React from 'react';
import {Title, Grey_text} from '../styled/components.js'
import Strategy_list from '../Components/Strategy_list.js'

export default function Account_page(props){

  return (
    <div className='container' >
      <div className=' row'>
        <div className='col-1'/>
        <div className='col-12 col-sm-5' >
          <div className="row justify-content-start">
            <Title className='col-9 mb-2'>
              Личный кабинет
            </Title>
            <Grey_text className='col-9'>
              Управляйте своими стратегиями <br /> и ключами отсюда
            </Grey_text>
            <div className='col-9'>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6'>
          <Strategy_list account={true}/>
        </div>
      </div>
    </div>
  )
}
