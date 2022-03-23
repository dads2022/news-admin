import { lazy, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import "./App.scss"
import "./modules/ChartjsConfig"
import { WalletProvider } from "./context/WalletProvider"

// Import pages
const SignIn = lazy(() => import("./component/auth/SignIn"))
const Layout = lazy(() => import("./component/Layout"))


export default function App() {
    const location = useLocation();
    const html = document.querySelector("html") as HTMLElement
    useEffect(() => {
        html.style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        html.style.scrollBehavior = "";
    }, [location.pathname]); // triggered on route change

    return (
        <WalletProvider>
            <Routes>
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/*" element={<Layout />} />
            </Routes>
        </WalletProvider>
    );
}