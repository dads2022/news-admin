import { useState, useEffect } from "react"

export function ToggleDarkMode() {
    const currentTheme: string | null = localStorage.getItem("theme")
    const [theme, setTheme] = useState<string>(currentTheme as string)
    const colorTheme = theme === "dark" ? "light" : "dark"

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(colorTheme)
        root.classList.add(theme as string)
        localStorage.setItem("theme", theme as string)
    }, [colorTheme, theme])

    return [colorTheme, setTheme] as const
}

export default function DarkModeButton() {
    const [colorTheme, setTheme] = ToggleDarkMode()
    const [enabled, setEnabled] = useState<boolean>(colorTheme === "dark" ? false : true)
    return (
        <div
            onClick={() => {
                setTheme(colorTheme)
                setEnabled(!enabled)
            }}
            className="cursor-pointer inline-flex items-center"
        >
            <svg
                className={classNames(enabled ? "text-slate-600" : "text-yellow-600")}
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="4" />
                <path d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7" />
            </svg>
            <span className={classNames(enabled && "text-gray-600", "mx-2")}>/</span>
            <svg
                className={enabled ? "text-slate-200" : "text-gray-300"}
                width="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </div>
    )
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ")
}
