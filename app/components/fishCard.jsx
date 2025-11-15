import Image from "next/image";


export function FishCard({fish, result, addFish, removeFish, population, onClick}) {

  return (
    <>
      <div key={fish.species} className="flex flex-col items-center">
        <div onClick={onClick} className=" border border-gray-300 flex flex-col items-center p-2">
          <h2 className=" mb-[2em]">{fish.species} </h2>
          <div className= "relative">
            <Image src={`/images/${fish.img}`} alt={fish.species} width={200} height={200} className={`${result.ok ? '' : 'grayscale'}`} />
            <div className={`${result.errors.includes("temperature") ? "rouge" : ""} absolute -top-[20px] left-2`}>{fish.minTemp}°-{fish.maxTemp}°</div><div className={`${result.errors.includes("pH") ? "rouge" : "gren"} absolute -top-[20px] right-2 `} >pH: {fish.minPh}-{fish.maxPh}</div><div className={`${result.errors.includes("region") ? "rouge" : ""} absolute bottom-0 right-2 `}>{fish.region == "asia" ? 'Asie' : fish.region == "south america" ? "Amazonie" : ""}</div>
            <div className="absolute bottom-0 left-2">{fish.minIndividuals > 1 ? `min.${fish.minIndividuals}` : ""}</div>
          </div>
        </div>
        <div className="flex justify-center gap-5 picnic text-[3em] w-full">
          <div className={`${result.ok ? "bleu cursor-pointer" : " text-gray-500"}`} onClick={() => {
            if (result.ok) {
              addFish(fish);
            }
          }}>+
          </div>
          <div className={Object.keys(population).includes(fish.species) ? "rouge cursor-pointer" :" text-gray-500" } onClick ={() => {
            removeFish(fish);
          }}>
            -
          </div>
        </div>
        <div className="flex flex-col gap-2  items-start lg:h-[4em] h-[3em]">
          <div className="rouge text-center">{result.errors.includes('compatibility') ? `population incompatible ` : result.errors.includes('tank size') ? `minimum ${fish.minTankSize} L` : result.errors.includes('population') ? "Surpopulation" : "" }</div>
        </div>
      </div>

    </>
  );
}
