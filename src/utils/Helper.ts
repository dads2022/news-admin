import { toast } from "react-toastify"

export const toastPushNotification = (message: string, type: any, theme = localStorage.getItem("theme")) => {
    const options: any = {
        type,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme,
    }
    return toast(message, options)
}