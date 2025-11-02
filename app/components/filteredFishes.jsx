'use client';
import Image from "next/image";
import {useState, useEffect, useMemo, useCallback} from "react";
import { Population } from "./population";


export function FilteredFishes({tankVolume, tankPh, tankTemp, tankRegion}) {

  const [fishes, setFishes] = useState ([]);
  const [addedFish, setAddedFish] = useState ([]);

  useEffect (() => {
    const fetchFishes = async () => {
      const response = await fetch ('/data/fishes.json');
      const data = await response.json ();
      setFishes (data);
    };
    fetchFishes ();
  }, []);

  const population = useMemo (() => {
    return addedFish.reduce((acc, fish) => {
    const initialCount = fish.minIndividuals - 1;
    acc[fish.species] = (acc[fish.species] || initialCount) + 1;
    return acc;
  }, {});
  }, [addedFish]);



  const minTankSizes = Object.entries(population).map(([species, qty]) => {
    const fish = fishes.find(f => f.species === species);
    return fish ? fish.minTankSize : 0
  });

  const minimumVolume = minTankSizes.length > 0 ? Math.max(...minTankSizes) : 0;

  const occupiedVolume = useMemo(() => {
    const getMinusLiterByFish = (fish, qty) => {
      return (fish.minusLiters / fish.minIndividuals) * qty;
    }
    return population ? Object.entries(population).reduce((total, [species, qty]) => {
      const fish = fishes.find(f => f.species === species);
      return total + getMinusLiterByFish(fish, qty);
    }, 0) : 0;
  }, [population, fishes]);


  const newVolume = tankVolume - occupiedVolume;



  const isSelectable = useCallback((fish) => {
    const errors = [];
    const fishQty = population[fish.species] || 0;
    const fishIndice = fishQty > 0 ? (fish.minusLiters / fishQty) : fish.minusLiters;
    const remainingVolume = newVolume - fishIndice;

      if (fish.minTankSize > tankVolume) {
        errors.push("tank size");
      }
      if (remainingVolume < 0) {
        errors.push("population");
      }

      if (fish.minPh > tankPh || fish.maxPh < tankPh) {
        errors.push("pH");
      }
      if (fish.minTemp > tankTemp || fish.maxTemp < tankTemp) {
        errors.push("temperature");
      }
      if (fish.region !== tankRegion && tankRegion !== '') {
        errors.push("region");
      }

      if (errors.length > 0) {
        return {ok: false, errors}

      }
      return {ok: true, errors: []}

    ;
  }, [newVolume, tankPh, tankTemp, tankRegion, tankVolume, population]);

  const calculatedResult = useMemo(() => {
    return fishes.map(fish => ({
      fish,
       result: isSelectable(fish)}));

    },
    [fishes, isSelectable]

  )

  return (
    <>
    <div className ="lg:flex h-[100%]">

      <div className="flex gap-5 lg:w-[50%] flex-wrap h-[100%] overflow-scroll">
        {calculatedResult.map (({fish, result}) => (

          <div key={fish.species} className="flex flex-col items-center w-[12em] h-[18em]">

            <h2>{fish.species} {fish.minIndividuals > 1 ? `(min.${fish.minIndividuals})` : ""}</h2>
            <Image src="/images/maxresdefault.jpg" alt={fish.species} width={200} height={200} className={result.ok ? '' : 'grayscale'} />
            <div className="flex gap-2 flex-wrap justify-center"><span className={result.errors.includes("temperature") ? "rouge" : "green"}>{fish.minTemp}°-{fish.maxTemp}°</span><span className={result.errors.includes("pH") ? "rouge" : "green"} >pH: {fish.minPh}-{fish.maxPh}</span><span className={result.errors.includes("region") ? "rouge" : "green"}>{fish.region}</span><span className="rouge">{result.errors.includes('population') ? "L'aquarium est trop petit" : ""}</span>
            </div>
            <div className="flex justify-center gap-5 picnic text-[3em] w-full">
              <span className="bleu" onClick={() => {
                const result = isSelectable(fish)
                if (result.ok) {
                  setAddedFish([...addedFish, fish]);
                }
              }}>+
              </span>
              <span className="rouge grayscale-0" onClick ={() => {

                const index = addedFish.findIndex(f => f.species === fish.species);
                if (index > -1) {
                  const newAddedFish = [...addedFish];
                  newAddedFish.splice(index, 1);
                  setAddedFish(newAddedFish);
                }
              }}>
                -
              </span>
            </div>
          </div>

        ))}
      </div>
      <div className=" lg:w-[50%]">
        <Population fish={population} volume={newVolume} minimumVolume={minimumVolume} originalVolume={tankVolume}/>
      </div>
    </div>
    </>);
}
