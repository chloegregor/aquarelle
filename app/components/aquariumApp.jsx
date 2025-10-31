'use client';
import {useState, useEffect} from "react";
import {FilteredFishes} from "./filteredFishes";

export function AquariumApp() {
  const [tankVolume, setTankVolume] = useState(300);
  const [tankPh, setTankPh] = useState(7);
  const [tankTemp, setTankTemp] = useState(24);
  const [tankRegion, setTankRegion] = useState('');
  console.log("tankVolume dans AquariumApp:", tankVolume);
  return (
    <><div className="flex flex-col gap-10 mb-10">
        <div className="flex flex-col">
          <label htmlFor="tankVolume">{tankVolume} litres</label>
          <input className="w-[10em]"
            type="range"
            id="tankVolume"
            value={tankVolume}
            onChange={(e) => setTankVolume(Number(e.target.value))}
            min={30}
            max={300}
            step={10}
          />
        </div >
        <div className="flex flex-col">
          <label htmlFor="tankPh">pH {tankPh}: </label>
          <input className="w-[10em]"
            type="range"
            id="tankPh"
            value={tankPh}
            onChange={(e) => setTankPh(Number(e.target.value))}
            min={5.5}
            max={8.5}
            step={0.1}
          />
        </div>
        <div className="flex flex-col">
        <label htmlFor="tankTemp">{tankTemp}°C: </label>
        <input
          className="w-[10em]"
          type="range"
          id="tankTemps"
          value={tankTemp}
          onChange={(e) => setTankTemp(Number(e.target.value))}
          min={15}
          max={30}
          step={1}
        />
      </div>

        <div className="flex flex-col">
        <label htmlFor="tankRegion">Région : </label>
        <select className="w-[10em] border" id="tankRegion" name="tankRegion" onChange={(e) => {
          setTankRegion(e.target.value);
          console.log("tankRegion:", e.target.value);
        }}>
          <option value="">Toutes</option>
          <option value="asia">Asie</option>
          <option value="south america">Amérique du sud</option>
        </select>
      </div>

      </div>

      <FilteredFishes tankVolume={tankVolume} tankPh={tankPh} tankTemp={tankTemp} tankRegion={tankRegion} />
    </>
  );
}
