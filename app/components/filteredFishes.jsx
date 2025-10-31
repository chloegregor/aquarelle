'use client';
import Image from "next/image";
import {useState, useEffect, useMemo} from "react";
import { Population } from "./population";


export function FilteredFishes({tankVolume, tankPh, tankTemp, tankRegion}) {

  const [fishes, setFishes] = useState ([]);
  const [addedFish, setAddedFish] = useState ([]);
  const [warning, setWarning] = useState ({});

  useEffect (() => {
    const fetchFishes = async () => {
      const response = await fetch ('/data/fishes.json');
      const data = await response.json ();
      setFishes (data);
    };
    fetchFishes ();
  }, []);

  const population = addedFish.reduce((acc, fish) => {
    const initialCount = fish.minIndividuals - 1;
    acc[fish.species] = (acc[fish.species] || initialCount) + 1;
    return acc;
  }, {});

  const minTankSizes = Object.entries(population).map(([species, qty]) => {
    const fish = fishes.find(f => f.species === species);
    return fish.minTankSize;
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



  const isSelectable = (fish) => {
    const fishQty = population[fish.species] || 0;
    const fishIndice = fishQty > 0 ? (fish.minusLiters / fishQty) : fish.minusLiters;
    return (
      fish.minTankSize <= tankVolume
      && newVolume - fishIndice >= 0
      && fish.minPh <= tankPh
      && fish.maxPh >= tankPh
      && fish.minTemp <= tankTemp
      && fish.maxTemp >= tankTemp
      && (fish.region === tankRegion || tankRegion === '')

    );
  }

  console.log("volume dispo", newVolume);

  return (
    <>
    <div className ="flex ">

      <div className="flex gap-5 w-[50%] flex-wrap ">
        {fishes.map ((fish) => (
          <div key={fish.species} className={`${isSelectable(fish) ? '' : 'grayscale'} flex flex-col items-center w-[12em] h-[15em]`}

          >
            <h2>{fish.species}</h2>
            <Image src="/images/maxresdefault.jpg" alt={fish.species} width={200} height={200} />
            <div className="flex justify-center gap-5 picnic text-[3em] w-full">
              <span className="bleu" onClick={() => {
                if (isSelectable(fish)) {
                  setAddedFish([...addedFish, fish]);
                  setWarning((prev) => ({...prev, [fish.species]: null}));
                }else {
                  setWarning ((prev) => ({...prev, [fish.species]: "Pas assez de place dans l'aquarium"}));
                  setTimeout (() => {
                    setWarning ((prev) => ({...prev, [fish.species]: null}));
                  }, 1100);
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
            <p className="rouge grayscale-0! text-wrap text-center">{warning[fish.species]}</p>
          </div>

        ))}
      </div>
      <div className="mb-10">
        <Population fish={population} volume={newVolume} minimumVolume={minimumVolume} originalVolume={tankVolume}/>
      </div>
    </div>
    </>);
}
