import { toast } from "react-toastify"

export const toastPushNotification = (message: string, type: any, theme = "dark" || "light") => {
    const options = {
        type,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme,
    } as any
    return toast(message, options)
}