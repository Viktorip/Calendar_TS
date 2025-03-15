import { DateTime } from "luxon";

export function getMonth():number {
    const m:number = new Date().getMonth();
    return m;
}

export function getYear():number {
    const y:number = new Date().getFullYear();
    return y;
}

export function getDaysInMonth(year:number, month:number):number {
    const n:number = new Date(year, month, 0).getDate();
    return n;
}

export function getMonthLocaleString(year:number, month:number, locale:string = 'fi'):string {
    const m:string = new Date(year, month).toLocaleString(locale, {month: 'long'});
    return m;
}

export function getDayLocaleString(year:number, month:number, day:number, locale:string = 'fi-FI', dayFormat:Intl.DateTimeFormatOptions = {weekday:'long'}):string {
    const d = new Date(year,month,day);
    const tf = new Intl.DateTimeFormat(locale, dayFormat).format(d);
    return tf;
}

export function getTodayLocaleStringLong(locale:string = 'fi-FI') {
    const d = new Date();
    return new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
    }).format(d);
}

export function getNextHolidayDate(data:holidaydata) {
    const d = new Date();
    const year:string = d.getFullYear().toString();
    const next = data[year].find((item:holiday) => DateTime.fromFormat(item.date, "dd.MM.yyyy").toUnixInteger() > Math.floor(d.getTime() / 1000));
    return next;
}