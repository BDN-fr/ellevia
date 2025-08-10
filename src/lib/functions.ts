export function dateTimeString(date: String): String {
  return date.slice(9,11) + ':' + date.slice(11,13)
}

export function durationString(duration:number): String {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return hours > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${minutes}min`;
}