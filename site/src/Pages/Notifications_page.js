import React, {useState} from 'react';
import {Title} from '../styled/components.js'



export default function Main_page(props){
  return (
    <div className='container'>
      <div className='row'>
        <div className = 'col-1'/>
        <div className = 'col-5'>
          <div className="row justify-content-start">
            <Title className='col-lg-9'>
              Уведомления
            </Title>
          </div>
        </div>

      </div>
    </div>
  )
}
