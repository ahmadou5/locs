"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  DBeatsMarketplaceAddress,
  DBeatsMarketplaceAbi,
  nftAbi,
} from "@/config/data";
import { useAccount } from "wagmi";

export const useApproveItem = (nftAddress) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const account = useAccount();
  const userAddress = account.address;

  useEffect(() => {
    const approveAndListItem = async () => {
      setIsLoading(true);
      setError(null);

      if (!window.ethereum) {
        alert("Please install MetaMask!");
        setIsLoading(false);
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User denied account access");
        setIsLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);

      try {
        const isApprovedForAll = await nftContract.isApprovedForAll(
          userAddress,
          DBeatsMarketplaceAddress
        );
        if (isApprovedForAll) {
          setIsApproved(true);
          await listItem(nftAddress);
          setIsLoading(false);
          return;
        }

        const tx = await nftContract.setApprovalForAll(
          DBeatsMarketplaceAddress,
          true
        );
        await tx.wait();
        setIsApproved(true);
        await listItem(nftAddress);
        alert("Item approved and listed successfully");
      } catch (error) {
        console.error("Error approving or listing item:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (nftAddress) {
      approveAndListItem();
    }
  }, [nftAddress]);

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

    try {
      const listingPrice = await marketplaceContract._listingPrice();
      // add alchemy estimate gas to prevent failed tx for gas price**********************************
      // https://docs.alchemy.com/reference/estimategas-sdk-v3
      console.log("listing NFT");
      const tx = await marketplaceContract.connect(signer).listItem(nftAddress, 9, 100000000, {
          value: listingPrice,
          gasLimit: 2221000,
        });
      await tx.wait();
      alert("Item listed successfully");
    } catch (error) {
      console.error("Error listing item:", error);
    }
  };

  return { isApproved, isLoading, error };
};
