


export function ConvertHoursStringToMinutes (hourString: string){
                   // Ex:"18:00" =split> ["18","00"] =map(Number)> [ 18 , 00 ]
const [hours, minutes] = hourString.split(":").map(Number)
// [position[0], position[1]] 

const minutesAmount = ( hours * 60 ) + minutes

return minutesAmount;
}

