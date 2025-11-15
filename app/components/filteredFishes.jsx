'use client';
import {useState, useEffect, useMemo, useCallback} from "react";
import { Population } from "./population";
import {FishCard} from "./fishCard";
import Image from "next/image";
import {FishFiche} from "./fishFiche";


export function FilteredFishes({tankVolume, tankPh, tankTemp, tankRegion}) {

  const [fishes, setFishes] = useState ([]);
  const [ population, setPopulation] = useState ({});
  const [openFish, setOpenFish] = useState (null);
  console.log("openFish:", openFish);

  const ResetPopulation = () => {
    setPopulation ({});
  }

  useEffect (() => {
    const fetchFishes = async () => {
      const response = await fetch ('/data/fishes.json');
      const data = await response.json ();
      setFishes (data);
    };
    fetchFishes ();
  }, []);


  const fishMap = useMemo(() => {
  return Object.fromEntries(fishes.map(f => [f.species, f] ))
}, [fishes]);



  const minimumVolume = Object.keys(population).reduce((max, species) =>
  {
    const fish = fishMap[species];
    if (fish) {
      const requiredVolume = fish.minTankSize;
      const volume = requiredVolume > max.volume ? requiredVolume : max.volume;
      return { species, volume: volume };

    }

  }, { species: null, volume: 0 });



  const occupiedVolume = useMemo(() => {
    const getMinusLiterByFish = (fish, qty) => {
      return (fish.minusLiters / fish.minIndividuals) * qty;
    }
    return population ? Object.entries(population).reduce((total, [species, {qty}]) => {
      const fish = fishMap[species];
      return total + getMinusLiterByFish(fish, qty);
    }, 0) : 0;
  }, [population, fishMap]);


  const newVolume = tankVolume - occupiedVolume;


  const isSelectable = useCallback((fish) => {
    const errors = [];
    const fishQty = population[fish.species]?.qty || 0;
    const fishIndice = fishQty > 0 ? (fish.minusLiters / fish.minIndividuals) : fish.minusLiters;
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

      if (fish.extraSpeciesAggression && Object.entries(population).some (([species, qty]) => {
        return fishMap[species].extraSpeciesAggression && species !== fish.species;
      })
      ) {
        errors.push ("compatibility");
      }

      if (fish.intraSpeciesAggression && fishQty > 0) {
        errors.push ("compatibility");
      }

      if (errors.length > 0) {
        return {ok: false, errors}
      }
      return {ok: true, errors: []}

    ;
  }, [newVolume, tankPh, tankTemp, tankRegion, tankVolume, population, fishMap]);

  const calculatedResult = useMemo(() => {
    return fishes.map(fish => ({
      fish,
       result: isSelectable(fish)}));

    },
    [fishes, isSelectable]

  )



  const addFish = (fish) => {
    setPopulation (prev => {
      const currentFish = prev[fish.species];
      const currentQty = currentFish ? currentFish.qty : fish.minIndividuals - 1;
      const newQty = currentQty + 1;

      return {
        ...prev,
        [fish.species]: {qty:newQty, data: fish}
      };
    })
  }

  const removeFish = (fish) => {
    setPopulation (prev => {
      const currentFish = prev[fish.species];
      const currentQty = currentFish ? currentFish.qty : 0;

      if (currentQty > fish.minIndividuals){
        const newQty = currentQty -1;
        const species = fish.species;
        return {
          ...prev,
          [species]: {...prev[species], qty:newQty}
        };
      }else {
        const newPop = {...prev};
        delete newPop[fish.species];
        return newPop;
      }
    })
  }


  return (
    <>
    <div className ="flex flex-col-reverse lg:flex-row h-[100%] ">
      <div className="relative lg:w-[50%] h-[50%] lg:h-[100%] border border-gray-300 lg:border-none">
        <div className={`overflow-scroll h-[100%] lg:h-[100%] ${openFish ? "hidden" : "block"}`}>
          <div className={`grid lg:grid-cols-3 grid-cols-2 text-[0.6em] lg:text-[1em] content-start lg:px-[1em] px-[0.2em] gap-[0.2em] lg:gap-2 pt-[0.2em] lg:pt-0}`}>
            {calculatedResult.map (({fish, result}) => (
              <div key={fish.species} className="">
                <FishCard onClick={() => setOpenFish(fish)} fish={fish} result={result} addFish={addFish} removeFish={removeFish} population={population} />
              </div>
            ))}
          </div>
        </div>
        {openFish && <div className="overflow-scroll h-[100%] lg:h-[100%]">
          <FishFiche fish={openFish} onClose={() => setOpenFish(null)} />
        </div>}

      </div>
      <div className=" lg:w-[50%] lg:h-[100%] h-[50%] lg:border-l-1 lg:border-gray-300">
        <Population fish={population} volume={newVolume} minimumVolume={minimumVolume} originalVolume={tankVolume} tankPh={tankPh} tankTemp={tankTemp} tankRegion={tankRegion} reset={ResetPopulation} minusFish={removeFish}/>
      </div>
    </div>
    </>);
}
