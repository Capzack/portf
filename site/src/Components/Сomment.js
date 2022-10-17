import React, {useState} from 'react';
import {Theme_shadow_block, Text, Img} from '../styled/components.js'

import User_image from '../media/images/123.png'
import Like from '../media/images/like.svg'
import Dislike from '../media/images/dislike.svg'
import LikeFill from '../media/images/like_fill.svg'
import DislikeFill from '../media/images/dislike_fill.svg'
export default function Commentary(props){
  let created_at = new Date(props.comment.created_at)
  let [likes, setLikes] = useState(props.comment.likes)
  let [dislikes, setDislikes] = useState(props.comment.dislikes)
  let [reacted, setReacted] = useState(props.comment.reacted)

  function reactedHeandler(e, isLike){
    if (reacted == isLike){
      isLike ? setLikes(--likes) : setDislikes(--dislikes)
      setReacted(null)
    }
    else{
      if (reacted != null)
        isLike ? setDislikes(--dislikes) : setLikes(--likes)
      isLike ? setLikes(++likes) : setDislikes(++dislikes)
      setReacted(isLike)
    }
    fetch('/api/like/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "reacted_object": `/api/commentary/${props.comment.id}/`,
        "status" : isLike
      })
    })
  }

  return(
    <Theme_shadow_block className='col-12 col-sm-8 p-2 mt-3'>
      <div className='row align-items-center m-0 p-2'>
        <Img className='p-0' height='24px' width='24px' src={props.comment.author.profile_picture ? props.comment.author.profile_picture : User_image}/>
        <Text fs= '16px' fw='700' className='col-7'>{props.comment.author.nickname}</Text>
        <Text fs= '14px' className='col-2'>{created_at.toLocaleDateString()}&nbsp;{created_at.toLocaleTimeString()}</Text>
        <Text fs='16px' className='col-12 p-3'>
          {props.comment.text}
        </Text>
        <Text fs='16px' className='p-3 col-1'>
          {likes}
        </Text>
        <Img
          onClick={e=>{reactedHeandler(e, true)}}
          className='p-0 me-2'
          height='32px'
          width='32px'
          src={reacted ? LikeFill : Like}/>
        <Text fs='16px' className='p-3 col-1'>
          {dislikes}
        </Text>
        <Img
          onClick={e=>{reactedHeandler(e, false)}}
          className='p-0'
          height='32px'
          width='32px'
          src={reacted == false ? DislikeFill : Dislike}/>
      </div>
    </Theme_shadow_block>
  )
}
