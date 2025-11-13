import Link from "next/link";
import { AquariumApp } from "../components/aquariumApp.jsx";


export default function Simulateur() {
  return (
    <>

    <header className="lg:h-[20%] h-[10%] flex relative">
      <div className="flex items-center ml-[1em] text-[1.2em]">
        <Link href="/" className="bleu hover:underline">accueil</Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="lg:text-[7em] text-[2.5em]">aquarelle</h1>
      </div>
    </header>
    <main className=" h-[100%] lg:h-[80%] relative ">
      <AquariumApp />

    </main>
    </>
  );
}
