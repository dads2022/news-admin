import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../context/AuthProdiver"

export default function ProtectedRoute({ children }: any) {
    const location = useLocation()
    const {
        authContextValue: { authState },
    } = useAuth()
    return !authState.isAuth ? (
        <Navigate to={"/auth/signin"} state={{ previousPage: location.pathname }} />
    ) : (
        children
    )
}
