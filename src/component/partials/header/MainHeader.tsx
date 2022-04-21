import { useEffect, useState } from "react"
import FilterButton from "../actions/FilterButton"
import Datepicker from "../actions/Datepicker"

export default function MainHeader() {
    const path = window.location.pathname
    const [title, setTitle] = useState("")
    useEffect(() => {
        console.log(1111)
    }, [path])
    return (
        <>
            {/* Left: Avatars */}
            {/* <DashboardAvatars /> */}
            <h4 className="font-bold text-violet-500 dark:text-violet-400">{title}</h4>
            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
            </div>
        </>
    )
}
