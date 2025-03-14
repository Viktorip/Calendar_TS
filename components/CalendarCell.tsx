import { twMerge } from 'tailwind-merge';
import { capitalizeFirstLetter } from '../utils/utils';
import { useEffect, useState } from 'react';

export default function CalendarCell({ index, className, dayLong="", dayShort="" }: { index: number, className: string, dayLong?:string, dayShort?:string }) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const styles:string = twMerge(`flex justify-between w-full sm:h-24 max-sm:h-36 border-1 rounded-sm p-2 bg-sky-500 text-white ${className}`);
    const maxWidth:number = 964;
    const breakPoint:number = 639;
    
    window.addEventListener('resize', ()=>{
        setInnerWidth(window.innerWidth);
    });

    return (
        <div className={styles}>
            <div className={`sm:text-md max-sm:text-3xl`}>
                {dayLong && (innerWidth > maxWidth || innerWidth <= breakPoint) ? capitalizeFirstLetter(dayLong) : dayShort && innerWidth <= maxWidth ? capitalizeFirstLetter(dayShort) : ""}
            </div>
            <div className={`sm:text-2xl max-sm:text-5xl`}>
                 {index}
            </div>
        </div>
    )
}