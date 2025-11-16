'use client';
import Image from 'next/image';
import {useState, useEffect} from 'react';

export function Plants({img, absolute, width, rotateWay, rotate }) {


  const [isClicked, setIsClicked] = useState(null);

  const onClick = () => {
    setIsClicked(!isClicked);
  }


  const inverseRotate = rotateWay === 'rotateInLeft' ? 'rotateOutLeft' : rotateWay === 'rotateInRight' ?  'rotateOutRight' : '';

  useEffect(() => {
    if (isClicked == false) {
      const timer = setTimeout(() => {
        setIsClicked(null);
      }, 500); // Durée de l'animation en ms
      return () => clearTimeout(timer);
    }
  })
  return (
<div className ={`  absolute ${absolute} ${isClicked ? rotateWay : isClicked === false ? inverseRotate : rotate ? "plantmoving" : ""}`} onClick={onClick}>
  <Image src={`/images/${img}`}alt="plant" width={300} height={300} className={width} priority />
</div>  )
}
