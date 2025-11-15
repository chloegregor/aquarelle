import Image from "next/image";

export function FishFiche({fish, onClose}) {
  if (!fish) return null;
  return (
    <div className="absolute top-5 left-0 right-0 bg-withe bg-opacity-50 relative ">
      <div className=" flex flex-col gap-[1em] justify-center items-center p-[2em] ">
        <button className="absolute top-0 right-5 cursor-pointer" onClick={onClose}>
           <Image src={"/images/croix.png"} alt={"fermer"} width={15} height={100}/>
        </button>
        <h2 className=" text-center text-[1.5em]  mb-4">{fish.species.toUpperCase()}</h2>
        <div className="w-[80%] flex justify-center">
         <Image src={`/images/${fish.img}`} alt={fish.species} width={500} height={400} className="mb-4" />
        </div>

        <p > {fish.description}</p>
        <div >
          <p className="mb-2"><strong>Température:</strong> {fish.minTemp}°C - {fish.maxTemp}°C</p>
          <p className="mb-2"><strong>pH:</strong> {fish.minPh} - {fish.maxPh}</p>
          <p className="mb-2"><strong>Région:</strong> {fish.region === "asia" ? "Asie" : fish.region === "south america" ? "Amazonie" : ""}</p>
          <p className="mb-2"><strong>Taille minimale du bac:</strong> {fish.minTankSize} L</p>
          <p className="mb-2"><strong>Individus minimum:</strong> {fish.minIndividuals}</p>
        </div>
      </div>
    </div>
  );
}
