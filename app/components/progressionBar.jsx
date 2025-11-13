export function ProgressionBar({percentage}) {
  return (
    <div className="flex justify-end w-full lg:h-5 h-1 relative"
    style={{backgroundImage: `url('/images/spectre.png') `, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <div
      className="absolute top-0 right-0 h-full transition-all duration-500  bg-white"
      style={{ width: `${100 - percentage}%`,  } }>

      </div>
    </div>
  );
}
