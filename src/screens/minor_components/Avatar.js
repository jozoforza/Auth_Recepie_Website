import React from 'react'
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
import SVG from 'react-inlinesvg';
import {options, genRandonString} from '../../assets/avatarConfig'

const Avatar = ({seed, size}) => {
    const avatar = createAvatar(micah, {...options,seed: seed});  
  return (
    <div><SVG src={avatar.toString()} style={{width: size}}/></div>
  )
}

export default Avatar