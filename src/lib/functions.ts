import { productionRange } from "./api";

export function dateTimeString(date: String): String {
  return date.slice(9,11) + ':' + date.slice(11,13)
}

export function durationString(duration:number): String {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return hours > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${minutes}min`;
}

const errorsMessages: Record<string, string> = {
  "no_solution": "Pas de solution possible pour ce trajet, essayez de modifier la date et l'heure",
  "no_destination": "La destination n'est pas desservie, essayez de modifier la date et l'heure",
  "date_out_of_bounds": "Date en dehors de la periode de production, veuillez choisir une date entre le " + new Date(productionRange.min).toLocaleDateString() + " et le " + new Date(productionRange.max).toLocaleDateString() + "."
}

export function getErrorMessage(id: string): string | undefined {
  return errorsMessages[id]
}

export function getCurrentIsoTime(): string {
  const now: Date = new Date();
  const offset: number = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  return new Date(now.getTime() - offset).toISOString().slice(0,16);
}