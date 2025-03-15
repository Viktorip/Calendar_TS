import { ReactNode, useEffect, useState } from "react"
import { getDaysInMonth, getMonth, getMonthLocaleString, getYear, getDayLocaleString } from "../utils/dateutils";
import { capitalizeFirstLetter } from "../utils/utils";
import CalendarCell from "./CalendarCell";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Calendar({ monthN }: { monthN?: number }, { yearN }: { yearN?: number }) {
    const [month, setMonth] = useState<number>(monthN || getMonth());
    const [year, setYear] = useState<number>(yearN || getYear());
    const [cells, setCells] = useState<ReactNode[]>([]);

    const monthLocale: string = capitalizeFirstLetter(getMonthLocaleString(year, month));

    useEffect(() => {
        setCells(constructMonthArray(year, month));
    }, [year, month]);

    const handleNextMonthClick = (): void => {
        const newMonth: number = (month + 1) == 12 ? 0 : (month + 1);
        if (newMonth == 0) {
            setYear(year + 1);
        }
        setMonth(newMonth);

    }

    const handlePrevMonthClick = (): void => {
        const newMonth: number = (month - 1) == -1 ? 11 : (month - 1);
        if (newMonth == 11) {
            setYear(year - 1);
        }
        setMonth(newMonth);
    }

    return (
        <div>

            <div className="flex justify-center w-full">
                <div onClick={handlePrevMonthClick}><KeyboardArrowLeftIcon className="text-3xl hover:cursor-pointer hover:opacity-75" /></div>
                <div className="flex justify-center w-52 text-xl font-bold">
                    {monthLocale} {year}
                </div>
                <div onClick={handleNextMonthClick}><KeyboardArrowRightIcon className="text-3xl hover:cursor-pointer hover:opacity-75" /></div>
            </div>
            <div className="grid sm:gap-4 max-sm:gap-2 sm:grid-cols-7 max-sm:grid-cols-1 sm:p-3 max-sm:p-1">
                {cells}
            </div>

        </div>
    )
}

function constructMonthArray(year: number, month: number): Array<ReactNode> {
    const arr: ReactNode[] = [];
    //sunday is index 0, saturday index 6
    const firstDayIndex: number = new Date(year, month, 1).getDay() || 7;
    const lastDate: number = new Date(year, month + 1, 0).getDate();
    const lastDayIndex: number = new Date(year, month, lastDate).getDay() || 7;
    const prevMonthLastDay: number = new Date(year, month, 0).getDate() + 1;
    /*
    console.log("firstDayIndex:", firstDayIndex);
    console.log("lastDate:", lastDate);
    console.log("lastDayIndex:", lastDayIndex);
    console.log("prevMonthLastDay:", prevMonthLastDay);
    */

    for (let i: number = firstDayIndex; i > 1; i--) {
        const id = prevMonthLastDay - i + 1;
        arr.push(<CalendarCell className="bg-gray-300" index={id} key={id + 999} />);
    }

    for (let i: number = 1; i <= lastDate; i++) {
        //find out if today and style it different
        const isToday = !!(i == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear());
        //find out of saturday or sunday and style them different
        const dayIndex = new Date(year, month, i).getDay() || 7;
        const dayLong = getDayLocaleString(year, month, i, 'fi-FI', { weekday: 'long' });
        const dayShort = getDayLocaleString(year, month, i, 'fi-FI', { weekday: 'short' });
        arr.push(<CalendarCell className={isToday ? 'bg-green-500' : dayIndex == 6 || dayIndex == 7 ? 'bg-red-500' : ''} index={i} key={i} dayLong={dayLong} dayShort={dayShort} />);
    }

    for (let i: number = lastDayIndex; i < 7; i++) {
        const id = i - lastDayIndex + 1;

        arr.push(<CalendarCell className="bg-gray-300" index={id} key={id + 99} />);
    }
    return arr;
}