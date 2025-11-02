'use client';
import {useState, useEffect} from "react";

export function Population({fish, volume, minimumVolume, originalVolume}) {
  console.log("minimumVolume dans Population:", minimumVolume);
  console.log("volume dans Population:", volume);
  console.log("originalVolume dans Population:", originalVolume);

  const fishes = Object.entries(fish);

  const isNotEnoughVolume = () => {
    return (volume < 0  || minimumVolume > originalVolume ) ?
   "Le volume de l'aquarium n'est pas suffisant pour cette population." :
     null;
  }

  return (
    <>
      <div className="border">
        <p>{isNotEnoughVolume(volume)}</p>
        <ul>
          {fishes.map(([species, count]) => (
            <li key={species}>{species}: {count}</li>
          ))}
        </ul>
      </div>
      <div>
      </div>
    </>
  );
}
