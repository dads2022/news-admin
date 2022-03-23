import { Route, Navigate } from "react-router-dom"
import useWallet from "../context/WalletProvider"

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { currentAccount, connectWallet } = useWallet()
    return (
        <Route
            {...rest}
            element={props => {
                if (!currentAccount || !connectWallet) return <Navigate to={{
                    pathname: `/auth/signin`,
                    state: { from: props.location }
                }}/>
                return <Component currentAccount={currentAccount} {...props} />
            }}
        />
    )
}