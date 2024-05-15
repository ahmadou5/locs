'use client'
import { IoIosCopy } from "react-icons/io";
import { GlobalContext } from "@/context/context"
import { handleCopy, formatEthAddress, formatMString } from "@/config/format";
import { useAccount, useBalance , useChainId } from "wagmi";
export const NewUserCard = () => {
    const { isAdmin, isArtist, nftLength,setNftLenght } = GlobalContext();
    const { address } = useAccount()
    const { chainId:chain } = useChainId()
    const {  data } = useBalance({
        address: address,
    })
    return (
      <div className="w-full mt-36 h-auto">
        <div className="w-[97%] ml-auto mr-auto rounded-3xl flex h-[420px] bg-white/20">
          <div className=" w-[45%] flex flex-col items-center justify-center py-4 px-1 ">
            <div className="w-[200px] h-[200px] mb-18 py-2.5 px-2.5  rounded-full bg-white">
              <div className="w-[180px] h-[180px] py-1 px-1 border bg-[#171717]/35 border-blue-600/15 rounded-full">
                <img
                  src="./assets/profile.jpg"
                  className="w-[99%] h-[99%] ml-auto mr-auto rounded-full"
                />
              </div>
            </div>
            <div className="py-2 flex font-extrabold mr-2">
              {`Rank:  ${isArtist ? "Artist" : "User"}`}
              {isArtist && (
                <img
                  src="./assets/blue.png"
                  className="ml-2 mr-2 w-5 mt-0.5 h-5"
                />
              )}
            </div>
            <div className="py-2 flex font-semibold text-lg">
                  <p>{address && formatEthAddress(address)}</p>
                  <IoIosCopy
                    onClick={() => {
                      handleCopy(address);
                    }}
                    className=" cursor-pointer ml-2 mt-1"
                  />
                </div>
            <div className="ml-1 py-2 px-1 font-light">
              {`Total Number of Music NFTs ${
                isArtist ? "You Created" : "You Bought"
              } is ${nftLength}`}
            </div>

            <div className="flex items-center justify-center text-center flex-col py-1 px-3">
              <div className=" ml-2 mr-8 flex flex-col mt-1.5 ">
              
              </div>
            </div>
          </div>
          <div className=" ml-auto mr-auto w-[45%]">
            <div className="ml-auto mr-auto mt-auto mb-auto">
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
    );
}