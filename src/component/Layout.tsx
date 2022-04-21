import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Sidebar from "./partials/Sidebar"
import Header from "./partials/Header"
import MainHeader from "./partials/header/MainHeader"

import { routes } from "../utils/Router"

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-slate-900 dark:text-slate-100">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <MainHeader />
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
