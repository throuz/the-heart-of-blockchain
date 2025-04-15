export default function Logo() {
  return (
    <div className="relative w-12 h-12">
      {/* House outline */}
      <div className="absolute w-full h-full">
        {/* Roof outline */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-red-600 border-r-[12px] border-r-transparent"></div>
        {/* House body outline */}
        <div className="absolute top-[12px] w-full h-[40px] border-2 border-red-600 rounded-b-md"></div>
      </div>
      {/* Heart in the middle */}
      <div className="absolute top-[18px] left-1/2 transform -translate-x-1/2 text-red-600 text-2xl">
        ❤️
      </div>
    </div>
  );
}
