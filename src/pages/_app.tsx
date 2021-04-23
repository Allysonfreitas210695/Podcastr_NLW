import { Header } from "../components/Header";
import { Play } from "../components/Play";
import "../styles/globo.scss";
import styles from "../styles/app.module.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";




function MyApp({ Component, pageProps }) {
 return(
   <PlayerContextProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Play/>
    </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
