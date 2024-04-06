"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DBeatsFactoryAddress, DBeatsFactoryAbi } from "@/config/data";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { NFTStorage, File } from "nft.storage";
import { LoadingSuspense } from "../suspense/Loading";
import { LoadedSuspense } from "../suspense/Loaded";

export const CreateView = () => {
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [imageFile, setimageFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(0);
  const [nftSymbol, setNftSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
//   const [tokenURI, setTokenURI] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const account = useAccount();
  const userAddress = account.address;
  let imageIpfsUrl;
  let musicUrl;
  let uriData;
  let tokenURI;
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(files);
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Assuming you want to handle only one image for simplicity
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setimageFile(imageFile);
      setImageInput(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setIsLoading(true);
    handleUploadImageToIpfs();
    handleUploadMusicToIpfs();
    
    //setTimeout(async () => {
     //storeExampleNFT();
    //setTimeout(async () => {
   //   setIsloaded(true)
    //     mintNFTonFactory()
    //   },25000);
    // }, 10000);
    // getExampleImage();
  } catch (error) {
    console.log(error);
  }
  };

  const handleUploadImageToIpfs = async () => {
    try {
      if (!imageFile) return;
      console.log("uploading image to ipfs");
      const content = new Blob([imageFile]);
      const cid = await client.storeBlob(content);
      imageIpfsUrl = `https://ipfs.io/ipfs/${cid}`;
      console.log("Uploaded image:", imageIpfsUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadMusicToIpfs = async () => {
    try {
      console.log("uploading music to ipfs");
      const music = new Blob([files[0]]);
      const cid2 = await client.storeBlob(music);
      const url = `https://ipfs.io/ipfs/${cid2}`;
      musicUrl = url;
      console.log("Uploaded music:", musicUrl);
      setIsLoading(false);
      setIsLoaded(true)
      setIsLoaded(false)
    } catch (error) {
      console.log(error);
    }
  };
  async function getExampleImage() {
    const imageOriginUrl = imageIpfsUrl;
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
  }

  async function storeExampleNFT() {
    const image = await getExampleImage();
    const nft = {
      image, 
      name: name,
      description: description,
      animation_url: musicUrl,
    };

    const metadata = await client.store(nft);
    console.log("NFT data stored!");
    console.log("Metadata URI: ", metadata.url);
    // setTokenURI(metadata.url);
    //tokenURI = metadata.url;
    setIsLoading(false);
    mintNFTonFactory();
  }

  async function mintNFTonFactory() {
    try {
      if (window.ethereum) {
        console.log(tokenURI)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const factoryContract = new ethers.Contract(
          DBeatsFactoryAddress,
          DBeatsFactoryAbi,
          signer
        );
        const tx = await factoryContract.createNFT(
          DBeatsFactoryAddress,
          userAddress,
          tokenURI,
          numberOfCopies,
          name,
          nftSymbol,
          {gasLimit: 10000000}
        );
        await tx.wait();
        console.log("tx done", tx.hash);
      } else {
        console.log("Ethereum object not found, install Metamask.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // add a loading spinner to the page while isLoading is true **********************************************************
  return (
    <div className="w-[100%] text-black mt-24 flex flex-col justify-center items-center">
      <h1 className="font-bold mt-4 mb-5 text-2xl">Create</h1>
      <div className="w-[95%] ml-auto mr-auto py-8 px-8 h-auto flex justify-evenly rounded">
        <div className="w-[50%] py-8 px-5 items-center rounded-3xl bg-white/25 ">
        <form onSubmit={handleSubmit} className=" items-center">
            <div className="flex">
            <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                placeholder="Enter Artist Name"
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
          </div>
          <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                placeholder="Enter Track Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          </div>
          <div className="flex">
            <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                placeholder="Enter Sale Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          </div>
          <div className="flex">
            <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="number"
                required
                placeholder="Enter Number of Copies"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value > 1) {
                    setNumberOfCopies(value);
                  } else {
                    // Option 1: Reset the input to 1
                    e.target.value = 1;
                    setNumberOfCopies(1);
                  }
                }}
              />
            </div>
          </div>
          <div className=" ml-auto mr-auto w-[300px] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                placeholder="Enter NFT Symbol"
                onChange={(e) => setNftSymbol(e.target.value)}
              />
            </div>
          </div>
          </div>
          <div className=" ml-auto mr-auto w-[95%] mt-[4px] h-20">
            <div className="h-[50%] mt-auto mb-auto py-0 px-2 rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
              <select
              className="h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
              value={selectedGenre}
              required
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Select a Genre</option>
              <option value="Electronic">Electronic</option>
              <option value="Classical">Classical</option>
              <option value="Pop">Pop</option>
            </select>
            </div>
          </div>
      
            <div className="bg-black/35 w-[95%] py-1 ml-auto mr-auto flex rounded-3xl mt-1 text-white">
              <h1 className=" py-4 ml-auto mr-auto">Upload Cover</h1>
              <input
                className="w-[50%] h-10 ml-auto mr-auto items-end rounded mt-3 font"
                type="file"
                placeholder="Upload Cover image"
                accept=".jpg,.jpeg,.png,.gif"
                required
                onChange={handleImageChange}
              />
            </div>
            <div className="bg-black/35 w-[95%] py-1 ml-auto mr-auto rounded-3xl mt-3 text-white">
              <div className="flex">
              <h1 className=" py-4 ml-auto mr-auto">Upload Track</h1>
              <input
                className="w-[50%] h-10 ml-auto mr-auto items-end rounded mt-3 font"
                type="file"
                placeholder="Upload files"
                // multiple
                required
                accept=".mp3,.wav,.ogg"
                onChange={handleFileChange}
              />
              </div>
              <div className="w-[70%] ml-auto mr-auto text-center rounded-3xl h-7 bg-red-500/55">
                <p className="py-0.5">We only accept .mp3 .wav .ogg files Innit  </p>
              </div>
            </div>
            <div className="w-full mt-6 flex">
            <button
              type="submit"
              className="bg-blue-500 ml-auto mr-auto hover:bg-blue-700 w-42 text-white font-bold py-2 px-4 rounded-2xl mt-3"
            >
              Create Now
            </button>
            </div>
          </form>
        </div>
        <div className="w-[30%] flex flex-col rounded-2xl bg-white/35 py-8 px-8">
          <div className="ml-auto bg-black/25 w-[220px] rounded-full h-[220px] mr-auto">
          {imageInput ? (
            <Image className="ml-auto mr-auto py-2  rounded-3xl" src={imageInput} alt="Preview" width={200} height={200} />
          ) : (
            <Image
              className="ml-auto mr-auto py-2 rounded-3xl"
              src="/assets/placeholder.png"
              alt="Placeholder"
              width={200}
              height={200}
            />
          )}
          </div>
          <div className={`mt-12 py-4 px-3 rounded-3xl`}>
          {artistName && <div className="flex mt-2 mb-3  rounded-3xl bg-black/25 py-2 px-2"> Artist Name: <p className="mr-2 ml-2">   {artistName}</p> </div>}
          {name && <div className="flex py-2 mt-3 nb3 rounded-3xl bg-black/25  px-2"> Genre Name: <p className="mr-2 ml-2">  {name}</p> </div>}
          {description && <div className="flex mt-3 nb3 rounded-3xl bg-black/25  py-2 px-2"> Description: <p className="mr-2 ml-2">{description}</p> </div>}
          {price && <div className="flex py-2  mt-3 nb3 rounded-3xl bg-black/25 px-2"> Price: <p className="mr-2 ml-2">{price}</p> ETH</div>}
          </div>
          
        </div>
      </div>
      {isLoaded && <LoadedSuspense/>}
      {isLoading && <LoadingSuspense/>}
    </div>
  );
};
