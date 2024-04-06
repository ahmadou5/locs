import { TailSpin } from "react-loader-spinner";
export const LoadedSuspense = () => {
  return (
    <div className="inset-0 fixed bg-black/15 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
      <div className="lg:h-[250px] h-auto w-[80%] lg:w-[30%] py-3 px-3 mb-20 mt-[200px] drop-shadow-glow2 bg-black/65 rounded-3xl ml-auto mr-auto">
        <div className="w-full text-center py-8 px-8">
          <p className="ml-auto mr-auto text-white font-bold">Created</p>
        </div>
        <div className="w-full flex items-center text-center py-6 px-6">
          <div className="ml-auto mr-auto ">
            <img src='./assets/blue.png' className='h-20 w-20' />
          </div>
        </div>
      </div>
    </div>
  );
};