"use client";
import { useCheckArtist } from "@/hooks/useCheckArtist";
export const Buy = () => {
  const isArtist = useCheckArtist();
  return (
    <div>
      {isArtist ? (
        <button
          
          type="button"
          className="rounded-[3.125rem] w-[200px] h-10 bg-[#3396FF] text-white border-[#424242]"
        >
          List
        </button>
      ) : (
        <button
          
          type="button"
          className="rounded-[3.125rem] w-[200px] h-10 bg-[#3396FF] text-white border-[#424242]"
        >
          Buy
        </button>
      )}
    </div>
  );
};
