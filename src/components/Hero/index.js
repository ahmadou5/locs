import { FaArrowLeft, FaArrowRightLong } from "react-icons/fa6";

export const Hero = () => {
  return (
    <div className="lg:bg-grey-200/15 text-white/85 mt-20 ">
      <div className=" py-2 px-2 lg:flex ml-auto mr-auto flex flex-col lg:flex-row mt-20 lg:w-full w-[95%] lg:h-[700px] h-[1200px]">
        <div className="lg:text-6xl lg:w-[60%] w-[90%] lg:ml-0 lg:mr-0 ml-auto mr-auto lg:py-4 lg:px-8 lg:h-[95%]">
        <p className="text-start font-semibold lg:text-5xl text-3xl text mt-[50px] lg:mb-[60px] lg:mt-[110px]">Decentralized Music MarketPlace.</p>
          <p className="text-start lg:text-6xl text-xl mt-6 lg:mt-[20px]">Multi Chain Open MarketPlace for You and Your Listerners.</p>
          <p className="text-start lg:text-2xl text-lg font-bold mt-4 lg:mt-[50px]">Transform your Music - into asset!</p>
          <div className="w-full text-center flex h-[70px] items-center justify-center ml-auto mr-auto mt-8 lg:mb-[80px] mb-8 lg:mt-[80px]">
            <button className="h-11 text-xl rounded-full w-[150px] text-white hover:text-black hover:bg-white/20 ml-2 mr-2 flex py-2 px-5 text-center  hover:border hover:border-black bg-[#3396FF] ">Explore <FaArrowRightLong className="mt-1 ml-2" /></button>
            <button className="h-11 text-xl rounded-full w-[150px] border border-[#3396FF] text-black hover:text-black hover:bg-white/20 hover:border ml-2 mr-2  hover:border-black bg-white ">Learn</button>
          </div>
        </div>
        <div className=" lg:w-[40%] w-[99%] bg-white/15 lg:flex lg:flex-wrap h-[400px] lg:mt-14 border border-[#3396FF] lg:ml-0 lg:mr-0 ml-auto mr-auto rounded-2xl lg:py-8 lg:px-8 lg:h-[80%]">
         {/**  <img className="w-full rounded-lg h-full" src="./assets/headphone.png" /> */}
          <div className="w-[230px] lg:mt-1 lg:mb-1 mt-4 mb-3 h-[212px] ml-auto mr-auto bg-white py-2 px-2 rounded-2xl">
            <img className="w-[90%] rounded-lg h-[90%] ml-auto mr-auto mt-auto mb-auto" src="./assets/76.png" />
          </div>
          <div className="w-[230px] lg:mt-1 lg:mb-1 mt-4 mb-3 h-[212px] ml-auto mr-auto bg-white py-2 px-2 rounded-2xl">
            <img className="w-[90%] rounded-lg h-[90%] ml-auto mr-auto mt-auto mb-auto" src="./assets/music.png" />
          </div>
          <div className="w-[230px] lg:mt-1 lg:mb-1 mt-4 mb-3 h-[212px] ml-auto mr-auto bg-white py-2 px-2 rounded-2xl">
            <img className="w-[90%] rounded-lg h-[90%] ml-auto mr-auto mt-auto mb-auto" src="./assets/headphone.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
