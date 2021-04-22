//adicionou o yarn add date-fns
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
//------------------------------------------
import styles from "./styles.module.scss";

export function Header() {
  //pegar a data e mes.
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  });

  /*
  const currentDate = new Date();
  const mes = [
    "janeiro", "fevereiro", "março","Abril", "Maio", "junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

   <header>
   <span>{`${currentDate.getDate()}, de ${
        mes[currentDate.getMonth()]
      }`}</span>
    </header>
 */

  return (
    <header className={styles.haederContainer}>
      <img src="/logo.svg" alt="podcastr" />
      <p>O melhor para você ouvir, sempre</p>
       <span>{currentDate}</span>
    </header>
  );
}
