import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles.module.scss";
import { usePlayer } from "../../contexts/PlayerContext";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export function Play() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    islooping,
    toggleloog,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    clearPlayState,
    isShuffling,
    hasPrevious,
  } = usePlayer();



  
  useEffect(() => {
    if (!audioRef.current) {
      return;
    } else if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  
  
  function setuProgressListener() {
    audioRef.current.currentTime = 0;
    
    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  const episode = episodeList[currentEpisodeIndex];

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded(){
    if(hasNext){
      playNext();
    }else{
      clearPlayState()
    }
  }
  
  return (
    <div className={styles.playContainer}>
      <header>
        <img src="./playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcastr para ouvir</strong>
        </div>
      )}

      {episode && (
        <audio
          src={episode.url}
          ref={audioRef}
          autoPlay
          onEnded={handleEpisodeEnded}
          loop={islooping}
          onPlay={() => {
            setPlayingState(true);
          }}
          onPause={() => setPlayingState(false)}
          onLoadedMetadata={setuProgressListener}
        />
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ""}
          >
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            onClick={playPrevious}
            disabled={!episode || !hasPrevious}
          >
            <img src="./play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="./pause.svg" alt="Tocar" />
            ) : (
              <img src="./play.svg" alt="Tocar" />
            )}
          </button>
          <button
            type="button"
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <img src="./play-next.svg" alt="Tocar proximo" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleloog}
            className={islooping ? styles.isActive : ""}
          >
            <img src="./repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
