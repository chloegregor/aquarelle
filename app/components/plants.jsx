'use client';
import Image from 'next/image';
import {useState} from 'react';

export function Plants({img, absolute, width, rotate, }) {

  const [isClicked, setIsClicked] = useState(null);

  const onClick = () => {
    setIsClicked(!isClicked);
  }

  const inverseRotate = rotate === 'rotateInLeft' ? 'rotateOutLeft' : rotate === 'rotateInRight' ?  'rotateOutRight' : '';

  return (
<div className ={` absolute ${absolute} ${isClicked ? rotate : isClicked === false ? inverseRotate : ""}`} onClick={onClick}>
  <Image src={`/images/${img}`}alt="plant" width={300} height={300} className={width}/>
</div>  )
}
