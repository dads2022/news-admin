import { lazy, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import "./App.scss"
import "./utils/ChartjsConfig"
import { WalletProvider } from "./context/WalletProvider"
import { AuthContextProvider } from "./context/AuthProdiver"
// import ProtectedRoute from "./modules/ProtectedRoute"

// Import pages
const SignIn = lazy(() => import("./component/auth/SignIn"))
const ProtectedRoute = lazy(() => import("./modules/ProtectedRoute"))
const Layout = lazy(() => import("./component/Layout"))

export default function App() {
    const location = useLocation()
    const html = document.querySelector("html") as HTMLElement
    useEffect(() => {
        html.style.scrollBehavior = "auto"
        window.scroll({ top: 0 })
        html.style.scrollBehavior = ""
    }, [location.pathname]) // triggered on route change

    return (
        <AuthContextProvider>
            <WalletProvider>
                <Routes>
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </WalletProvider>
        </AuthContextProvider>
    )
}
