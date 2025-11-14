'use client';
import { useCallback, useMemo } from "react";
import { ProgressionBar } from "./progressionBar";

export function Population({ fish, volume, minimumVolume, originalVolume, reset, tankPh, tankTemp, tankRegion }) {






  const isAdaptedToTheTank = useCallback((fish) => {
    const errors = [];
    const fishData = fish.data;
    console.log("fishData:", fishData);
    if (!fishData) return false;

    if (originalVolume < fishData.minTankSize) {
      errors.push(`Volume`);
    }
    if (tankPh < fishData.minPh || tankPh > fishData.maxPh) {
      errors.push(`pH`);
    }
    if (tankTemp < fishData.minTemp || tankTemp > fishData.maxTemp) {
      errors.push(`Température`);
    }

    if (tankRegion !== "" && tankRegion !== fishData.region) {
      errors.push(`Région`);
    }


    if (errors.length > 0) {
      return { ok: false, errors}
    }
    return { ok: true, errors: []}
  }, [originalVolume, tankPh, tankTemp, tankRegion]);

  const FinalList = useMemo(() => {
    return Object.entries(fish).map(([fish, data]) => ({

    data,
    result: isAdaptedToTheTank(data)
    }));
 }, [fish, isAdaptedToTheTank]);


  return (
    <>
      <div className="h-full flex flex-col relative text-center">

        <div className="h-[100%] flex flex-col">
          <div className="grid   lg:grid-cols-4 grid-cols-3 lg:gap-[0.1em] gap-[0.2em] m-auto ml-[1em] mr-[1em]  ">
            {FinalList.map(({data, result}) => (

              <div key={data.data.species} className="flex flex-col items-center w-full relative ">
                <div className="picnic absolute lg:top-2 lg:left-3 left-0">
                  {data.qty}
                </div>
                <div className={`${result.ok && volume >= 0 ? "" : "grayscale"}`}>
                  <img src={`/images/${data.data.img}`} alt={data.data.species} className="swimming" />
                </div>
              </div>
            ))}
          </div>
          <div className=" text-end ">
            <button onClick={reset} className=" mr-[1em] cursor-pointer hover:underline  mb-[0.5em] text-[0.6em] lg:text-[0.9em]">Vider l'aquarium</button>
            <ProgressionBar percentage={Math.min(100, Math.max(0, ((originalVolume - volume) / originalVolume) * 100))} />
          </div>
        </div>
      </div>
    </>
  );
}
