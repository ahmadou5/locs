"use client";
import { GlobalContext } from "@/context/context";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { formatEthAddress } from "@/config/format";
import { IoMdPlay } from "react-icons/io";
import { PlayerSuspense } from "../suspense/Player";
import { ethers } from "ethers";
import {
  DBeatsMarketplaceAddress,
  DBeatsMarketplaceAbi,
  nftAbi,
} from "@/config/data";

export const DashboardView = () => {
  const {
    isAdmin,
    isPlayer,
    setGenre,
    setImgUrl,
    setMusicUrl,
    isArtist,
    setArtist,
    setIsPlayer,
    setPrice,
    nftLength,
    setNftLenght,
  } = GlobalContext();
  const nftEndpointUrl = "https://d-beats-server-8095.onrender.com/allNfts";
  const [nfts, setNfts] = useState([]);
  const [audio, setAudio] = useState(false);
  const [address, setAddress] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const account = useAccount();
  const userAddress = account.address;
 
  useEffect(() => {
    const getAllNfts = async () => {
      console.log("getting all nfts");
      try {
        const response = await axios.get(nftEndpointUrl);
        console.log(response.data);

        // Filter the NFTs where the artistAddress matches the userAddress
        const filteredNfts = response.data.filter(
          (nft) => nft.artistAddress === userAddress
        );
        setNftLenght(response.data?.length);

        // Update the state with the filtered data
        setNfts(response.data);
        // setNfts(filteredNfts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllNfts();
  }, [userAddress]);

  const approveItem = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    try {
      const res = await nftContract.isApprovedForAll(
        userAddress,
        DBeatsMarketplaceAddress
      );
      if (res === true) {
        return;
      }
      const tx = await nftContract.setApprovalForAll(
        DBeatsMarketplaceAddress,
        true
      );
      await tx.wait();
      alert("Item approved successfully");
    } catch (error) {
      console.error("Error listing item:", error);
    }
  };

  const listItem = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const marketplaceContract = new ethers.Contract(
      DBeatsMarketplaceAddress,
      DBeatsMarketplaceAbi,
      signer
    );
    const listingPrice = await marketplaceContract._listingPrice();
    const contractWithSigner = marketplaceContract.connect(signer);

    try {
      const tx = await contractWithSigner.listItem(nftAddress, 3, 100000000, {
        value: listingPrice,
        gasLimit: 221000,
      });
      await tx.wait();
      alert("Item listed successfully");
    } catch (error) {
      console.error("Error listing item:", error);
    }
  };

  return (
    <div className="mt-16">
      <div className="mt-10 w-full mb-[190px] ml-auto mr-auto flex flex-wrap h-auto">
        {nfts.map((student, index) => (
          <>
            <div
              key={index}
              className="h-[420px] ml-auto mr-auto  w-[400px] py-2 px-2 mt-5 mb-5  rounded-2xl bg-black/25"
            >
              <div className="w-[95%] ml-auto mr-auto rounded-2xl bg-white/55 h-[67%]">
                <img
                  src={student.imageURL}
                  className="w-[100%] ml-auto rounded-2xl mr-auto h-[100%]"
                />
              </div>
              <div className="flex w-[95%]">
                <div className="w-full py-2 px-4 flex">
                  <div className="font-extrabold">{`${student.name}`}</div>
                </div>
              </div>
              <div className="flex w-[95%]">
                <div className="w-full py-2 px-4 flex">
                  {/* <div className='font-extrabold'>{`Artist:  ${formatEthAddress(student?.owner)}`}</div> */}
                </div>
              </div>
              <div className="w-full mt-4 mb-2 flex">
                <button
                  onClick={() => {
                    setIsPlayer(true);
                    setGenre(student.name);
                    setImgUrl(student.imageURL);
                    setMusicUrl(student.musicFileURL);
                    setArtist(student.owner);
                    setPrice(student.price);
                  }}
                  className="h-8 w-[130px] text-white rounded-2xl bg-black/95 ml-4 mr-auto"
                >
                  Explore
                </button>
                <button
                  onClick={async () => {
                    console.log(student.nftAddress);
                    setNftAddress(student.nftAddress);
                    await approveItem();
                    await listItem();
                  }}
                  className="h-8 w-[130px] text-white rounded-2xl bg-black/95 ml-4 mr-auto"
                >
                  List Item
                </button>
              </div>
              {isPlayer && <PlayerSuspense />}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
