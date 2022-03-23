import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Sidebar from "./partials/Sidebar"
import Header from "./partials/Header"

import { routes } from "../utils/Router"

import DashboardAvatars from "./partials/dashboard/DashboardAvatars"
import FilterButton from "./partials/actions/FilterButton"
import Datepicker from "./partials/actions/Datepicker"

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        {/* Left: Avatars */}
                        <DashboardAvatars />
                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            {/* Filter button */}
                            <FilterButton />
                            {/* Datepicker built with flatpickr */}
                            <Datepicker />
                        </div>
                    </div>
                    <Routes>
                        {routes.map((item, index) => (
                            <Route key={index} path={item.path} element={<item.element />} />
                        ))}
                    </Routes>
                </main>
            </div>
        </div>
    )
}
