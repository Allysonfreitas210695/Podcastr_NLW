export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); //a redonda menor numero possivel do resto da divisao
  const minutes = Math.floor((duration % 3600) / 60); 
  const seconds = duration % 60;

  const timeString = [
    hours,
    minutes,
    seconds
  ].map(unit => String(unit).padStart(2, '0')) //ex: 1 houra ele colocar zero no final
  .join(':')

  
  return timeString;
}