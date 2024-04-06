'use client'
import { createContext, useContext, useState } from "react";


export const beatContext = createContext({});

export const BeatContextProvider = ({children}) => {
    const [artist, setArtist] = useState('');
    const [price, setPrice] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [musicUrl, setMusicUrl] = useState('');
    const [genre, setGenre] = useState('');
    const [isArtist,setIsArtist] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [isPlayer,setIsPlayer] = useState(false)
    const [nftLength,setNftLenght] = useState(0)
    
    const value = {
        artist,
        setArtist,
        isArtist,
        setIsArtist,
        isAdmin,
        setIsAdmin,
        nftLength,
        setNftLenght,
        isPlayer,
        setIsPlayer,
        imgUrl, 
        setImgUrl,
        musicUrl, 
        setMusicUrl,
        genre, 
        setGenre,
        price, 
        setPrice
    }
    return(
    <beatContext.Provider value={value}>
       {children}
    </beatContext.Provider>)
}


export const GlobalContext = () => useContext(beatContext)