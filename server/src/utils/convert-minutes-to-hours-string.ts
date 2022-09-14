export function ConvertMinutesStringToHours (minutesAmount: number){
    const hours = Math.floor(minutesAmount / 60) // arredondar pra baixo
    const minutes = minutesAmount % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

 }

