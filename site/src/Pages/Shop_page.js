import React from 'react';

import {Theme_input, Svg, Theme_shadow_block, Link} from '../styled/components.js'
import Filter from '../Components/Filter.js'
import Strategy_list from '../Components/Strategy_list.js'
import Filter_button from '../media/images/Filter_button.svg'

export default function Shop_page(props){

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-1'/>
        <div className='col-10 col-md-7'>
          <div className='row justify-content-between'>
            <Theme_input className= 'col-9 col-md-10 py-2' name="strategy_search" placeholder="Введите запрос"/>
            <Link href='/filter' className='col-2 p-0 d-block d-md-none'>
              <Theme_shadow_block height='45px' width='45px' className='p-2 m-0 text-center align-items-center'>
                <Svg src={Filter_button}/>
              </Theme_shadow_block>
            </Link>
            <div className='col-10 mt-5'>
              <Strategy_list/>
            </div>
          </div>
        </div>
        <div className='col-4 d-none d-md-block'>
          <Filter/>
        </div>
      </div>
    </div>
  )
}
