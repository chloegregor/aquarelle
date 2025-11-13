import Link from "next/link";
import { AquariumApp } from "../components/aquariumApp.jsx";


export default function Simulateur() {
  return (
    <>

    <header className="lg:h-[20%] h-[10%] flex relative">
      <div className="flex items-start mt-[2.5em] ml-[2em] lg:text-[1.1em] text-[0.8em]">
        <Link href="/" className="bleu hover:underline">accueil</Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="lg:text-[7em] text-[2.5em]">aquarelle</h1>
      </div>
    </header>
    <main className=" h-[90%] pb-[10em] lg:h-[80%]  ">
      <AquariumApp />

    </main>
    </>
  );
}
