'use client';
import {useState, useEffect} from "react";

export function Population({fish, newVolume}) {

  const fishesMinusLiters = fish.map(f => f.minusLiters || 0).reduce((a, b) => a + b, 0);




  return (
    <>
      <div>
        <h2>Population de l'aquarium:</h2>
        <ul>
          {fish.map((f, index) => (
            <li key={index}>{f.species}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Volume disponible: {newVolume} litres</h3>
      </div>
    </>
  );
}
