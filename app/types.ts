type holiday = {
    date: string,
    isBankingDate: boolean,
    nameFI: string,
    nameSE: string,
    nameEN: string
}

type holidaydata = {
    [key: string]:Array<holiday>
}