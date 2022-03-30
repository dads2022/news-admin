import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import useAuth from "../../context/AuthProdiver"
import DarkModeButton from "../../modules/DarkModeButton"

export default function SignUp() {
    const navigate = useNavigate()
    const {
        signUp,
        authContextValue: { authState },
    } = useAuth()
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
    const submitSignUp = async (data: any) => {
        try {
            await signUp(data)
            // navigate("/auth/login")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <section className="min-h-screen flex items-stretch">
            <section className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center">
                <div className="absolute bg-slate-900 dark:bg-slate-100 opacity-80 inset-0 z-0"></div>
                <div className="w-full px-24 z-10 text-white">
                    <h1 className="text-5xl font-bold tracking-wide">
                        Welcome to users!
                    </h1>
                    <p className="text-3xl my-4">
                        Please register an owned account to discover my platform.
                    </p>
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-4 text-center flex justify-center space-x-4">
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </span>
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </span>
                    <span>
                        <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </span>
                </div>
            </section>
            <section className="lg:w-1/2 w-full flex items-center justify-center md:px-10 bg-pink-200 dark:bg-slate-900">
                <div className="w-full py-5 z-20">
                    <h1 className="flex justify-center">
                        <img src="/img/logo.png" alt="" width="300" />
                    </h1>
                    <p className="my-3 text-center">
                        Register to continue or{" "}
                        <span className="underline text-center text-blue-500">
                            <Link to="/auth/login">Login now</Link>
                        </span>
                    </p>
                    <form
                        className="sm:w-2/3 w-full mx-auto px-5 lg:px-0 space-y-4"
                        onSubmit={handleSubmit(submitSignUp)}
                    >
                        <div className="mt-4">
                            <input
                                className="w-full border-0 p-2.5 rounded dark:bg-gray-700"
                                type="text"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message:
                                            "Please input email type, example: johndoe@email.com",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm lg:text-red-400 text-red-200">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-4">
                            <input
                                className="w-full border-0 p-2.5 rounded dark:bg-gray-700"
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password is at least 6 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm lg:text-red-400 text-red-200">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-4">
                            <input
                                className="w-full border-0 p-2.5 rounded dark:bg-gray-700"
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === watch("password"),
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-400">
                                    Your password does not match
                                </p>
                            )}
                        </div>
                        <div className="mt-4">
                            <input
                                className="w-full border-0 p-2.5 rounded dark:bg-gray-700"
                                type="text"
                                placeholder="Full Name"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 4,
                                        message: "Name is at least 4 characters",
                                    },
                                })}
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className={classNames(
                                    isSubmitting ? "cursor-not-allowed" : "",
                                    "mt-5 inline-flex items-center justify-center text-white font-bold block w-full p-4 text-lg rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
                                )}
                                disabled={isSubmitting}
                            >
                                <svg
                                    className={
                                        isSubmitting ? "animate-spin mr-3 h-5 w-5" : "hidden"
                                    }
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
                                SIGN UP
                            </button>
                            <div className="flex mt-5 items-center justify-center">
                                <DarkModeButton />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    )
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ")
}
