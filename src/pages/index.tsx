import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";
import { useContext } from "react";
import { PlayContext } from "../contexts/playContexts";

// Server Side Rendering (SSR)
// useEffect(() => {
//   fetch('http://localhost:3333/episodes)
//   .then(res => res.json())
//   .then(data => console.log(data))
// }, [])

//SSR
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes%27)
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data
//     }
//   }
// }

type Episodes = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  lastEpisode: Episodes[];
  allEpisodes: Episodes[];
};

export default function Home({ lastEpisode, allEpisodes }: HomeProps) {
  const { play }= useContext(PlayContext);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {lastEpisode.map((episodes) => {
            return (
              <li key={episodes.id}>
                <Image
                  width={182}
                  height={182}
                  src={episodes.thumbnail}
                  alt={episodes.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                 <Link href={`/episodes/${episodes.id}`}>
                  <a >{episodes.title}</a>
                  </Link>
                  <p>{episodes.members}</p>
                  <span>{episodes.publishedAt}</span>
                  <span>{episodes.durationAsString}</span>
                </div>

                <button type="button" onClick={ () => play(episodes)}>
                  <img src="/play-green.svg" alt="tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map( episodes => {
              return (
                <tr key={episodes.id}>
                  <td style={{width:72}}>
                    <Image
                      width={120}
                      height={120}
                      src={episodes.thumbnail}
                      title={episodes.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episodes.id}`}>
                    <a >{episodes.title}</a>
                    </Link>
                  </td>
                  <td>{episodes.members}</td>
                  <td style={{width:100}}>{episodes.publishedAt}</td>
                  <td>{episodes.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

//SSG
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      members: episode.members,
      url: episode.file.url,
    };
  });

  const lastEpisode = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      lastEpisode,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
