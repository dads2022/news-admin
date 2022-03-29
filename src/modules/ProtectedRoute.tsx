import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../context/AuthProdiver"

export default function ProtectedRoute({ children }: any) {
    const location = useLocation()
    const {
        authContextValue: { authState },
    } = useAuth()
    console.log(children)
    return !authState.isAuth ? <Navigate to={"/auth/signin"} state={location} /> : children
}
