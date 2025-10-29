'use client';
import {useState, useEffect} from "react";
import {FilteredFishes} from "./filteredFishes";

export function AquariumApp() {
  const [tankVolume, setTankVolume] = useState(500);
  console.log("tankVolume dans AquariumApp:", tankVolume);
  return (
    <>
      <div>
        <label htmlFor="tankVolume">litrage de l'aquarium: </label>
        <input
          type="range"
          id="tankVolume"
          value={tankVolume}
          onChange={(e) => setTankVolume(Number(e.target.value))}
          min={30}
          max={300}
          step={10}
        />
      </div>

      <FilteredFishes tankVolume={tankVolume} />
    </>
  );
}
