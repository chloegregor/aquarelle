import Link from "next/link";
import { AquariumApp } from "../components/aquariumApp.jsx";


export default function Simulateur() {
  return (
    <>

    <header className="lg:h-[20%] h-[10%] flex relative">
      <div className="flex lg:items-start lg:mt-[2em] ml-[2em] items-center lg:text-[1.1em] text-[0.8em]">
        <Link href="/" className="bleu hover:underline">accueil</Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="lg:text-[7em] text-[2.5em]">aquarelle</h1>
      </div>
    </header>
    <main className=" h-[90%] lg:pb-[10em]  pb-[8em] lg:h-[80%]  ">
      <AquariumApp />

    </main>
    </>
  );
}
