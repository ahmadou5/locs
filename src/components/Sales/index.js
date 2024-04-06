'use client'
import { FaSearchengin, FaSear } from "react-icons/fa6";
import { IoIosSearch, IoMdPlay } from "react-icons/io";
import { useAccount } from "wagmi";
import { formatEthAddress } from "@/config/format";
import { Each } from "./components/Each";
import { GlobalContext } from "@/context/context";
import axios from "axios";
import { useState, useEffect } from "react";
import { PlayerSuspense } from "../suspense/Player";
export const SalesView = () => {
  const [audio,setAudio] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [nfts, setNfts] = useState([]);
  const ListedNFTEndpoint = 'https://d-beats-server-8095.onrender.com/listed'
  const {address} = useAccount()
  const { isPlayer,setIsPlayer,setGenre,imgUrl, setImgUrl,musicUrl, setArtist, setPrice, setMusicUrl} = GlobalContext()

  useEffect(() => {
    const getAllNfts = async () => {
      console.log("getting all nfts");
      try {
        const response = await axios.get(ListedNFTEndpoint);
        console.log('data11',response.data);

        // Filter the NFTs where the artistAddress matches the userAddress
        const filteredNfts = response.data.filter(
          (nft) => nft.artistAddress === address
        );
        // Update the state with the filtered data
        setNfts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllNfts();
  }, [address]);
  const students = [
    {
      class:'js1',
      name:'imran',
      position:'striker'
    },
    {
      class:'js2',
      name:'haroun',
      position:'defence'
    },
    {
      class:'js2',
      name:'farouq',
      position:'defence'
    },
    {
      class:'js2',
      name:'Hassana',
      position:'defence'
    },
    {
      class:'js2',
      name:'Hauwa',
      position:'defence'
    },
    {
      class:'js2',
      name:'Hajara',
      position:'defence'
    },
    {
      class:'js2',
      name:'Hussaina',
      position:'defence'
    }
  ]
  return (
    <>
      <div className="w-full text-black mt-24">
        <div className="w-[90%] ml-auto mr-auto py-12 h-[190px]">
          <div className="py-2 px-28">
            <p className="text-6xl text-start font-light">Sales</p>
            <p className="mt-5 text-lg text-start  font-mono">
              Explore Genres from Your Favourite artist
            </p>
            <p className="mt-1 text-lg font-mono text-start ">
              Buy and Earn while Listening to what you want.
            </p>
          </div>
          {/** Search Bar Implemenrtation  */}
          <div className=" ml-auto mr-auto w-[91%] mt-[40px] h-24">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white text-xl flex flex-row w-[95%] ml-auto mr-auto">
            <IoIosSearch className="mt-3 text-2xl mr-3 ml-4"/>
              <input
                className=" h-[100%] w-[90%] outline-none bg-transparent py-3 px-3"
                type="text"
                placeholder="Search Genres/artists"
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </div>
          </div>
          {/** Cards Response Implemenrtation  */}
          <div className="mt-10 w-full mb-[190px] flex flex-wrap h-auto">
            {
              nfts && nfts.filter((student) => {
                return searchVal.toLowerCase() == '' ?
                student : student.name.toLowerCase().includes(searchVal)
              }).map((student, index) => (
                <>
            <div
              key={index}
              className="h-[420px] ml-8 mr-8  w-[400px] py-2 px-2 mt-5 mb-5  rounded-2xl bg-black/25"
            >
              <div className="w-[95%] ml-auto mr-auto rounded-2xl bg-white/55 h-[67%]">
                <img
                  src={student.imageURL}
                  className="w-[100%] ml-auto rounded-2xl mr-auto h-[100%]"
                />
              </div>
              <div className="flex w-[95%]">
                <div className="w-full py-2 px-4 flex">
                  <div className='font-extrabold'>{`${student.name}`}</div>
                </div>
              </div>
              <div className="flex w-[95%]">
                <div className="w-full py-2 px-4 flex">
                  <div className='font-extrabold'>{`Artist:  ${formatEthAddress(student.owner)}`}</div>
                </div>
              </div>
              <div className="w-full mt-4 mb-2 flex">
                <button onClick={() => {
                   setIsPlayer(true);
                  setGenre(student.name);
                  setImgUrl(student.imageURL);
                  setMusicUrl(student.musicFileURL);
                  setArtist(student.owner);
                  setPrice(student.price)
                 
                  }} className="h-8 w-[130px] rounded-2xl bg-blue-600/85 ml-4 mr-auto">Preview</button>
                <button className="h-8 w-[130px] rounded-2xl bg-blue-600/85 ml-auto mr-4">Buy</button>
              </div>
              {isPlayer && <PlayerSuspense />}
              
            </div>
          </>))
            }
            
          </div>
         
        </div>
      </div>
    </>
  );
};
