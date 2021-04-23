import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    islooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleloog: () => void;
    clearPlayState: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    
}

export const PlayerContent = createContext({} as PlayContextData);


type PlayercontextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children} : PlayercontextProviderProps){
   
        const[episodeList, setEpisodeList] = useState([]);
        const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);
        const [islooping, setLooping] = useState(false);
        const [isShuffling, setIsShuffling] = useState(false);



        function play(episode: Episode){
          setEpisodeList([episode])
          setCurrentEpisodeIndex(0)
          setIsPlaying(true)
        }

        function playList(list: Episode[] , index: number){
            setEpisodeList(list);
            setCurrentEpisodeIndex(index);
            setIsPlaying(true);
        }
      
        function togglePlay(){
          setIsPlaying(!isPlaying)
        }
        
        function toggleloog(){
            setLooping(!islooping)
          }
        
          function toggleShuffle(){
            setIsShuffling(!isShuffling)
          }

        function setPlayingState(state: boolean){
          setIsPlaying(state);
        }

        function clearPlayState(){
            setEpisodeList([])
            setCurrentEpisodeIndex(0)
        }

        const hasPrevious = currentEpisodeIndex > 0;
        const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

        function playNext(){
            if(isShuffling){
                const nextRamdomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
                setCurrentEpisodeIndex(nextRamdomEpisodeIndex)
            }else if(hasNext){ 
              setCurrentEpisodeIndex(currentEpisodeIndex + 1);
            }
           
            
        }

        function playPrevious(){
           if(hasPrevious){
               setCurrentEpisodeIndex(currentEpisodeIndex - 1);
            }
        }
      
        return (
          <PlayerContent.Provider 
          value={ {
              episodeList, 
              currentEpisodeIndex , 
              play, 
              playList,
              playNext,
              playPrevious,
              isPlaying, 
              togglePlay, 
              toggleloog,
              toggleShuffle,
              islooping,
              setPlayingState,
              hasNext,
              hasPrevious,
              clearPlayState,
              isShuffling
              } 
              }
              >

              {children}

          </PlayerContent.Provider>
        )
}

export const usePlayer = () => {
return useContext(PlayerContent);
}