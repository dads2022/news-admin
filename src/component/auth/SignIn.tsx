import { Link, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import useAuth from "../../context/AuthProdiver"
import Loading from "../../modules/SkeletonLoading"
import DarkModeButton from "../../modules/DarkModeButton"

export default function SignIn() {
    const { state }: any = useLocation()
    const navigate = useNavigate()
    const {
        signIn,
        authContextValue: { authState },
    } = useAuth()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    const submitLogin = async (data: any) => {
        try {
            await signIn(data)
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }

    if (authState.isAuth) return <Navigate to={state ? state.previousPage : "/"} replace={true} />
    return authState.isLoading ? (
        <Loading />
    ) : (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            <div className="relative max-w-sm w-full">
                <div className="relative rounded-2xl p-10 bg-white dark:bg-slate-800 shadow space-y-10">
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <img src="/img/logo.png" alt="" width="200" />
                        <label className="text-center text-lg font-semibold">
                            Please login to continue as Administrator
                        </label>
                    </div>
                    <form onSubmit={handleSubmit(submitLogin)}>
                        <div className="space-y-5">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                type="email"
                                placeholder="Email"
                                className="p-2.5 w-full border-0 bg-indigo-50 dark:bg-slate-700 rounded-md shadow focus:bg-blue-100 focus:ring-0"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-400">{errors.email.message}</p>
                            )}
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password is at least 6 characters",
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className="p-2.5 w-full border-0 bg-indigo-50 dark:bg-slate-700 rounded-md shadow focus:bg-blue-100 focus:ring-0"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-400">{errors.password.message}</p>
                            )}
                            <label className="inline-flex w-full items-center justify-between cursor-pointer">
                                <span className="text-sm underline text-green-500">
                                    <Link to="/auth/signup">Sign Up</Link>
                                </span>
                                <div>
                                    <input
                                        {...register("remember_me")}
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">
                                        Remember me?
                                    </span>
                                </div>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={classNames(
                                isSubmitting ? "cursor-not-allowed opacity-60" : "",
                                "mt-5 inline-flex items-center justify-center bg-blue-500 text-white w-full py-3 rounded font-bold shadow hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                            )}
                            disabled={isSubmitting}
                        >
                            <svg
                                className={isSubmitting ? "animate-spin mr-3 h-5 w-5" : "hidden"}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            LOGIN
                        </button>
                        <div className="flex mt-5 items-center justify-center">
                            <DarkModeButton />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ")
}
