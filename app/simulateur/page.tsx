import Link from "next/link";
import Image from "next/image";
import { AquariumApp } from "../components/aquariumApp.jsx";


export default function Simulateur() {
  return (
    <>

    <header className="lg:h-[25%] h-[10%] flex items-center relative">
      <div className="flex  lg:ml-[2em] ml-[1.1em] items-center lg:text-[1.1em] text-[0.8em]">
        <Link href="/" className="hover:underline deco-bleu flex relative ">Accueil<Image src="/images/plante3.png" alt="plante" width={30} height={15} className="absolute -top-1 -right-8"/>
</Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="lg:text-[7em] text-[2.5em]">aquarelle</h1>
      </div>
    </header>
    <main className=" h-[90%] lg:pb-[8em]  pb-[8em] lg:h-[75%]  ">
      <AquariumApp />

    </main>
    </>
  );
}
