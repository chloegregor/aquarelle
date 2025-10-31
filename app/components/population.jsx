'use client';
import {useState, useEffect} from "react";

export function Population({fish, volume}) {

  const fishes = Object.entries(fish);

  const isNotEnoughVolume = () => {
    return volume < 0 ?
   "Le volume de l'aquarium n'est pas suffisant pour cette population." :
     null;
  }

  return (
    <>
      <div>
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
