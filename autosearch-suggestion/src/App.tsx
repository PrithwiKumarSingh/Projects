import Search from "./components/Search";

export default function App(){
  return(
    <div className=" bg-[#22242A]  pt-20 h-screen">
      <div className=" w-full flex flex-col items-center ">
        <div className="text-white font-semibold text-6xl mb-4">
          Google  
        </div>
      <Search/>
      </div>

    </div>
  )
}