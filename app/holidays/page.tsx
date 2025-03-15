'use client'
import data from '@/data/holidaysdata.json'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const renderYearAccordian = (yearArr: Array<holiday>, year: string) => {
    return (
        <div key={year}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${year}-content`}
                    id={`panel${year}-header`}
                >
                    <Typography component="span">{year}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {yearArr.map(item => {
                        return (
                            <div key={item.date}>
                                {item.date} : {item.nameFI}
                            </div>
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default function HolidaysPage() {
    const hdata: holidaydata = data;

    return (
        <div className='flex flex-col items-center'>
            <div className='sm:w-4/5 max-sm:w-full'>Juhlapyhät listattuna</div>
            <div className='sm:w-4/5 max-sm:w-full space-y-4'>
                {Object.keys(hdata).map((el: string) => {

                    return renderYearAccordian(hdata[el], el)
                })}
            </div>
        </div>
    )
}