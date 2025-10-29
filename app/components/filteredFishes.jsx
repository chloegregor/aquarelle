'use client';
import Image from "next/image";
import {useState, useEffect} from "react";
import { Population } from "./population";


export function FilteredFishes({tankVolume}) {

  const [fishes, setFishes] = useState ([]);
  const [addedFish, setAddedFish] = useState ([]);
  const [newVolume, setNewVolume] = useState (tankVolume);



  useEffect (() => {
    const fetchFishes = async () => {
      const response = await fetch ('/data/fishes.json');
      const data = await response.json ();
      setFishes (data);
    };
    fetchFishes ();
  }, []);

  useEffect (() => {
    const MinusVolumofFishes = addedFish.map(f => f.minusLiters || 0).reduce((a, b) => a + b, 0);
    setNewVolume (tankVolume - MinusVolumofFishes);
    console.log("newVolume dans FilteredFishes:", newVolume);
  }, [addedFish, tankVolume, newVolume]
  )

  const isSelectable = (fish) => {
    return (
      fish.minTankSize <= newVolume
    )
  }

  return (
    <>
    <div>
      <Population fish={addedFish} newVolume={newVolume}/>
    </div>

    <div className="flex gap-5 ">
      {fishes.map ((fish) => (
        <div key={fish.species} className={`  ${isSelectable(fish) ? '' : 'grayscale'}`}
        onClick={() => {
          if (isSelectable(fish)) {
            setAddedFish([...addedFish, fish]);
          }
        }}
        >
          <h2>{fish.species}</h2>
          <Image src="/images/maxresdefault.jpg" alt={fish.species} width={200} height={200} />
        </div>

      ))}
    </div>
    </>);
}
