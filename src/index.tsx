import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import SkeletonLoading from "./modules/SkeletonLoading"

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
