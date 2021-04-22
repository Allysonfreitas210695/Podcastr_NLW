import { Header } from "../components/Header";
import { Play } from "../components/Play";
import "../styles/globo.scss";
import styles from "../styles/app.module.scss";
import { useState } from "react";
import { PlayerContent } from "../contexts/PlayerContext";


function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }
  
  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  return (
    <PlayerContent.Provider value={ {episodeList, currentEpisodeIndex , play, isPlaying, togglePlay, setPlayingState} }>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Play/>
    </div>
    </PlayerContent.Provider>
  );
}

export default MyApp;
