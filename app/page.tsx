import Image from "next/image";
import { AquariumApp } from "./components/aquariumApp.jsx";


export default function Home() {
  return (
    <>
    <header>
      <span className="text-center m-b-8">
        <h1>aquarelle</h1>
        <h2>pour un aquarium sans filtre !</h2>
      </span>
    </header>
      <AquariumApp />
    </>
  );
}
