/**
 * @param datetime 
 * @description returns the datetime in the format dd/mm/yyyy hh:mm
 */

export default function formatDatetime(datetime: Date): string {

    if(typeof datetime === 'string') {
        datetime = new Date(datetime)
    }

    // Pad single digits with a leading zero
    const pad = (num: number) => String(num).padStart(2, '0');

    const day = pad(datetime.getDay());
    const month = pad(datetime.getMonth() + 1); // getMonth() is zero-based
    const year = datetime.getFullYear();
    
    const hours = pad(datetime.getHours());
    const minutes = pad(datetime.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}