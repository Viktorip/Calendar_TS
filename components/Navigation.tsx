import Link from "next/link";



export default function Navigation() {

    return (
        <div className="flex justify-center text-xl divide-x-2 divide-gray-700 my-5">
            <div className="px-5 hover:opacity-75"><Link  href="/">Kalenteri</Link></div>            
            <div className="px-5 hover:opacity-75"><Link  href="/holidays">Juhlapyhät</Link></div>
            <div className="px-5 hover:opacity-75"><Link  href="/events">Omat tapahtumat</Link></div>
        </div>
    )
}