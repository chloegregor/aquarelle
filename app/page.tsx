import Image from "next/image";
import { AquariumApp } from "./components/aquariumApp.jsx";


export default function Home() {
  return (
    <>
    <header className="h-[10%]">
      <div className="text-center ">
        <h1>aquarelle</h1>
        <h2>pour un aquarium sans filtre !</h2>
      </div>
    </header>
    <main className=" h-[90%] ">
      <AquariumApp />
    </main>
    </>
  );
}
