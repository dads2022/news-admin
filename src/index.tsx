import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import "./index.scss"
import SkeletonLoading from "./modules/SkeletonLoading"

declare const window: Window & typeof globalThis & {
    dads: any
}

window.dads = {
    BASE_URL: process.env.NODE_ENV ? "https://news-admin.dadsnetwork.net" : "http://localhost:3000",
    REACT_APP_API: process.env.NODE_ENV ? "https://news-api.dadsnetwork.net" : "http://localhost:6969",
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Suspense fallback={<SkeletonLoading />}>
                <App />
            </Suspense>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
