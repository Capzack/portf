import React, {useState, useEffect} from "react";

import Strategy from '../Components/Strategy.js'
import {Submit_button, Text, Link} from '../styled/components.js'
export default function Strategy_list(props){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [Strategys, setStrategys] = useState([]);
  let Strategys_arr = Object.keys(Strategys).map(k =>
    <div key = {k} className='col-lg-6'><Strategy account = {props.account} data={Strategys[k]}/></div>
  )

  useEffect(() => {
    let tmp
    fetch(props.account ? "api/account/" : "api/strategy/", {
       headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        if (!res.ok){
          setError(true)
          setIsLoaded(true);
        }
        else{
          res.json()
          .then(result => tmp = result)
          .then(()=> {
            fetch('api/markets/', {
              headers: {
                 'Content-Type': 'application/json'
               },
            })
            .then(res=>res.json())
            .then(result=>{
              for(let i of tmp){
                i.small_icons = []
                for(let j of result){
                  if (i.markets.includes(j.id)){
                    i.small_icons.push(j.small_icon)
                  }
                }
              }
              setStrategys(tmp);
              setIsLoaded(true);
            })
          })
        }
      })
  }, [])


  if (error) {
    return (
      <div>Ошибка</div>
    )
  }
  else if (!isLoaded) {
    <div>Загрузка</div>
  }
  else {
    if (Strategys_arr.length != 0)
      return(
        <div className='row gy-4 gx-5'>
          {Strategys_arr}
        </div>
      )
    else if (window.location.pathname == '/account')
      return(
        <div className='row'>
          <Text>
            Стратегий пока нет
          </Text>
          <Link className='mt-2' href='/shop'>
              <Submit_button className='col-6 p-2'>Подключить</Submit_button>
          </Link>
        </div>
      )
  }
}
