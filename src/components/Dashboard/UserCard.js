'use client'
import { IoIosCopy } from "react-icons/io";
import { GlobalContext } from "@/context/context"
import { handleCopy, formatEthAddress, formatMString } from "@/config/format";
import { useAccount, useBalance , useChainId } from "wagmi";
export const UserCard = () => {
    const { isAdmin, isArtist, nftLength,setNftLenght } = GlobalContext();
    const { address } = useAccount()
    const { chainId:chain } = useChainId()
    const {  data } = useBalance({
        address: address,
    })

    return(
    <div className="w-full mt-24 h-auto">
        <div className="bg-black/50 w-[90%] mt-8 py-3 px-5 rounded-2xl h-auto ml-auto mr-auto ">
          <div className="flex flex-row">
            <div className="w-[48%] flex py-2 px-2 h-[90%] ml-auto mr-auto bg-white/25 rounded-3xl">
                <div className="py-10 px-4">
                  <img src="./assets/profile.jpg" className="w-24 h-24 ml-2 mr-4 rounded-full"/>
                </div>
                <div className="flex flex-col py-4 px-3">
                   <div className=" ml-2 mr-8 flex flex-col mt-1.5 ">
                   <div className="py-2 flex font-extrabold mr-2">{`Rank:  ${isArtist ? 'Artist' : 'User'}`}{isArtist && <img src="./assets/blue.png" className="ml-2 mr-2 w-5 mt-0.5 h-5"/>}</div>
                   <div className="py-2 flex font-semibold text-lg"><p>{address && formatEthAddress(address)}</p><IoIosCopy onClick={() => {
                    handleCopy(address)
                   }} className=" cursor-pointer ml-2 mt-1"/></div>
                   </div>
                   <div className="ml-1 py-2 px-1 font-light">
                    {`Total Number of Music NFTs ${ isArtist ? 'You Created' : 'You Bought'} is ${nftLength}`}
                  </div>
                </div>
               
            </div>
            <div className="w-[48%] flex py-2 px-2 h-[90%] ml-auto mr-auto bg-white/25 rounded-3xl">
                <div className="py-10 px-4">
                  <img src="./assets/cashq.png" className="w-24 h-24 ml-2 mr-4 rounded-full"/>
                </div>
                <div className="flex flex-col py-4 px-3">
                   <div className=" ml-2 mr-8 flex flex-col mt-1.5 ">
                   <div className="py-2 flex font-extrabold mr-2">{`${data?.symbol} Balance:  ${data?.formatted.slice(0,6)}`}</div>
                   <div className="py-2 flex font-extrabold mr-2">{`${"Portfolio Value"}:  ${data?.formatted}-${"USD"}:`}</div>
                   
                   </div>
                   <div className="ml-1 py-2 px-1 font-light">
                    {`You have ${data?.formatted.slice(0,4)} of ${data?.symbol} on Your Wallet which is Equivalant to ${0} USDT`}
                  </div>
                </div>
               
            </div>
          </div>
          
        </div>
    </div>
    )
}