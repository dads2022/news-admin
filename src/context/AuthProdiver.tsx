import { createContext, useEffect, useReducer, useContext, useMemo, useRef } from "react"
import { authReducer } from "../reducer/AuthReducer"
import axios from "axios"
import { toastPushNotification } from "../utils/Helper"

const initAuthState = {
    isLoading: true,
    isAuth: false,
    user: null,
}

export const headerWithAuth = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) return delete axios.defaults.headers.common["Authorization"]
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`)
}

interface IAuthContext {
    getUser?: any
    signIn?: any
    signUp?: any
    signOut?: any
    verifyAccount?: any
    ForgotPassword?: any
    authContextValue?: any
}

export const AuthContext = createContext<Partial<IAuthContext>>({})

export const AuthContextProvider = ({ children }: any) => {
    const [authState, authDispatch] = useReducer(authReducer, initAuthState)

    // get user login
    const getUser = async () => {
        headerWithAuth()
        try {
            const res = await axios.get(`${window.dads.REACT_APP_API}/user/info`)
            const result = await res.data
            authDispatch({
                type: "SET_AUTH",
                isLoading: false,
                isAuth: true,
                user: result.data,
            })
        } catch (e) {
            localStorage.removeItem("accessToken")
            authDispatch({
                type: "SET_AUTH",
                isLoading: false,
                isAuth: false,
                user: null,
            })
        }
    }

    // Check user keep logined on browser
    const interval: any = useRef(null)

    useEffect(() => {
        getUser()
        interval.current = setInterval(() => {
            getUser()
        }, 30 * 60 * 1000)
        return () => clearInterval(interval.current)
    }, [])

    // sign up
    const signUp = async (data: any) => {
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/auth/signup`, data)
            const result = await res.data
            toastPushNotification(result.message, "success")
        } catch (e: any) {
            const err = e.response ? e.response.data : "Bad request"
            toastPushNotification(err.message || err, "error")
        }
    }

    // signIn
    const signIn = async (data: any) => {
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/auth/signin`, data)
            const result = await res.data
            localStorage.setItem("accessToken", result.accessToken)
            toastPushNotification(result.message, "success")
            await getUser()
        } catch (e: any) {
            const err = e.response ? e.response.data : "Bad request"
            toastPushNotification(err.message || err, "error")
        }
    }

    // signOut
    const signOut = async () => {
        headerWithAuth()
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/auth/signout`, {
                token: localStorage.getItem("accessToken"),
            })
            const result = await res.data
            toastPushNotification(result.message, "success")
            localStorage.removeItem("accessToken")
            authDispatch({
                type: "SET_AUTH",
                isLoading: false,
                isAuth: false,
                user: null,
            })
        } catch (e: any) {
            const err = e.response ? e.response.data : "Bad request"
            toastPushNotification(err.message || err, "error")
        }
    }

    // verify accout - use to sign up and forgot password
    const verifyAccount = async (token: string) => {
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/auth/verify`, {
                token,
            })
            const result = await res.data
            localStorage.setItem("accessToken", result.accessToken)
            toastPushNotification(result.message, "success")
            await getUser()
        } catch (e: any) {
            const err = e.response ? e.response.data : "Bad request"
            toastPushNotification(err.message || err, "error")
        }
    }

    // forgot password
    const ForgotPassword = async (data: any) => {
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/auth/forgot-password`, data)
            const result = await res.data
            toastPushNotification(result.message, "success")
        } catch (e: any) {
            const err = e.response ? e.response.data : "Bad request"
            toastPushNotification(err.message || err, "error")
        }
    }

    const authContextValue = useMemo(() => {
        return { authState, authDispatch }
    }, [authState, authDispatch])

    const authValue = { signUp, signIn, signOut, verifyAccount, ForgotPassword, authContextValue }

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}
