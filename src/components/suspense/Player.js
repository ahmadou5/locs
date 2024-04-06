'use client'
import { GlobalContext } from "@/context/context"
import { IoIosExit } from "react-icons/io"
import { formatEthAddress } from "@/config/format"
import { parseEther,formatEther } from "ethers"
import { Buy } from "../Buttons/BuyButton"
export const PlayerSuspense = () => {
    const { isPlayer,setIsPlayer,genre,imgUrl, artist,musicUrl, price } = GlobalContext()
    return(
        <div className="inset-0 fixed bg-black/15 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="lg:h-[550px] flex h-auto w-[80%] lg:w-[70%] py-3 px-3 mb-20 mt-[70px]  bg-white/55 rounded-3xl ml-auto mr-auto">
          <div className='w-[58%] py-2 px-2 bg-black/40 text-center ml-auto mr-auto rounded-3xl'>
            <div className='w-[98%] ml-auto mr-auto rounded-2xl mt-2 mb-auto  bg-white/10 h-[70%]'>
                <img src={imgUrl} className='w-[100%] ml-auto rounded-2xl mr-auto h-full' />
            </div>
            <div className='w-[98%] py-1.5 px-3 ml-auto mr-auto rounded-2xl mt-8 mb-4 bg-white/10 h-[20%]'>
            <audio
                  className="w-[90%] ml-auto mr-auto mt-5 mb-2"
                  controls
                  autoplay
                >
                  <source src={musicUrl} type="audio/ogg" />
                  <source src="horse.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
            </div>
          </div>
          <div className='w-[38%] py-2 px-2 bg-black/40 text-white text-center ml-auto mr-auto rounded-3xl'>
           <div className='py-3 px-3' onClick={() => {
            setIsPlayer(false)
           
            }}>
            <IoIosExit className='text-2xl ml-auto mr-3 text-white'/>
           </div>
           <div className='w-full mt-8'>
            <div className='w-[95%] ml-auto py-4 px-3 rounded-2xl bg-white/25 mr-auto border border-black/25  h-32 '>
               <p className='font-extrabold text-xl text-start text-black/55'>NFT Details</p>
               <div className='text-start ml-3 font-semibold'>{`Name:  ${genre}`}</div>
               <div className='text-start ml-3 font-semibold'>{`Address:  ${formatEthAddress(artist)}`}</div>
               <div className='text-start ml-3 font-semibold'>{`Price:  ${formatEther(price)} ETH`}</div>
            </div>
            <div className='w-[95%] ml-auto py-4 px-3 rounded-2xl bg-white/25 mr-auto border border-black/25  h-16 '>
               <button className='bg-black h-10 rounded-2xl w-[150px]'>Buy</button>
            </div>
           </div>
           <div>
            
           </div>
          </div>
        </div>
      </div>
   )
}