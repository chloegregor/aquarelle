'use client';
import Link from "next/link";
import {useState, useEffect} from 'react';
import { Plants } from './components/plants.jsx';


export default function Home() {

  type Plant = {
    img : string;
    index: number;
  }

  const [plants, setPlants] = useState<Plant[]>([]);



  useEffect(() => {
    async function fetchPlants() {
      const response = await fetch('/data/plants.json');
      const data = await response.json();
      const dataWithIndex = data.map((plant, index) => ({...plant, index}));
      setPlants(dataWithIndex);
    }
    fetchPlants();
  }, []);
  if (!plants?.length) return null;

  console.log(plants);

  return (
    <>
    <main className="overflow-x-hidden">
      <div className="flex flex-col items-center h-[1900px] lg:h-[1500px] gap-5 ">
          <div className="flex flex-col items-center relative ">
          <h1 className="lg:text-[11em] lg:text-[2.5em] text-[4.5em]">aquarelle</h1>
          <h2 className="border-b-[1px] border-gray-300 w-[15em] absolute left-1/2 -translate-x-1/2 lg:bottom-5 -bottom-5">Simulateur d'aquarium naturel. </h2>
        </div>
        <div className="lg:w-[600px] w-[20em] flex flex-col items-center gap-10 mt-15 relative">
          <p className=""> L'écologiste Diane Walstad a developpé une méthode qui a révolutionné l’aquariophilie classique. Contrairement aux aquariums traditionnels qui nécessitent des changements d’eau fréquents et des filtres coûteux, cette approche consiste à recréer les conditions d'un écosystème équilibré:  Les bactéries présentes dans l'aquarium décomposent les déchets organiques qui deviennent assimilables par les plantes.</p>
          <p className=""> Les plantes sont essentielles à ce type d'aquariums naturels, aussi appellés aquariums "low-tech". Vous pouvez utiliser des plantes aquatiques en préparant un substrat naturel au fond du bac, des plantes flottantes ou des plantes vertes comme le pothos, le philodendron ou la monstera ! Il suffit qu'elles ait accès à suffisamment de lumière et de plonger leur racines dans l'eau. Toutes plantes à croissance rapide permettra d'éviter l'accumulation de déchets et le développement des algues.</p>
          <p> Sans effectuer de changement d'eau, il faudra tout de même remédier à l'évaporation de l'aquarium : c'est tout à fait possible en s'équipant d'un filtre à osmose inverse pour débarrasser l'eau courrante de ses mineraux afin de pas modifier le ph de votre aquarium, ou en utilisant de l'eau de pluie.</p>
          <p className="">  La surpopulation est le risque principal : trop de poissons entraîne stress, maladies et pollution de l'eau. Pour l’éviter, il est essentiel de connaître la capacité maximale de votre bac et la compatibilité des espèces. Le principe est simple : moins de poissons, plus de plantes !</p>
          <p className="">  Le simulateur vous permet de visualiser la population et la cohabitation des espèces, et de filtrer vos poissons par taille d’aquarium, pH, température et provenance. Il vous aide à prévoir un bac équilibré avant même d’y placer vos poissons. Cependant, il reste à titre indicatif. Un ecosystème ne peut pas être résumé à un algorythme, il convient de peupler votre bac progressivement et de l'observer attentivement !</p>
          <Link href="/simulateur" className=" text-[2em] bouton mt-[3em]">simulateur</Link>
          <Plants   img={plants[0].img} width={"lg:w-[33em] w-[10em]"} absolute={"lg:-top-80 -top-55 -left-30 lg:-left-119"}  rotate={"rotateInRight"} key={plants[0].index} />
          <Plants   img={plants[3].img} width={"lg:w-[35em] w-[11em]"} absolute={"lg:-top-50 top-60 -right-25 lg:-right-103"}  rotate={"rotateInRight"} key={plants[3].index} />
          <Plants   img={plants[2].img} width={"lg:w-[25em] w-[6em]"} absolute={"lg:top-90 lg:-left-120 lg:block hidden "}  rotate={""} key={plants[4].index} />
          <Plants  img={plants[4].img} width={"lg:w-[25em] w-[13em]"} absolute={" lg:top-180 top-340 lg:-right-30 -right-15 scale-x-[-1] "}  rotate={"rotateInLeft"} key={plants[1].index} />
        </div>
      </div>
    </main>
    <footer className="h-[1em] mx-[1em] flex gap-2 text-gray-500 lg:text-[0.8em] text-[0.6em]">
      <p className=""> Aquarelles, développement, design : Chloé Grégoire | Fonts : PicNic - Mariel Nils</p>

    </footer>
    </>

  )
}
