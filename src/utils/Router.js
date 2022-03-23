import { lazy } from "react"

// Main
const Dashboard = lazy(() => import("../component/main/Dashboard"))

// Content
const Overview = lazy(() => import("../component/main/content/Overview"))
const Add = lazy(() => import("../component/main/content/Add"))
const Update = lazy(() => import("../component/main/content/Update"))

export const routes = [
    {
        path: "/",
        element: Dashboard,
    },
    {
        path: "/content/overview",
        element: Overview,
    },
    {
        path: "/content/add",
        element: Add,
    },
    {
        path: "/content/update/:postId",
        element: Update,
    },
]
