import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuth from '../../context/AuthProdiver'
import Loading from '../../modules/SkeletonLoading'
import DarkModeButton from '../../modules/DarkModeButton'

export default function SignIn() {
    const { signIn, authContextValue: { authState } } = useAuth()
    const navigate = useNavigate()
    console.log(navigate)
    // const { from } = navigate.location.state || { from: { pathname: '/' } }
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()
    const submitLogin = async (data: any) => {
        try { await signIn(data) }
        catch (e) { console.log(e) }
    }
    
    if (authState.isAuth) return <Navigate to={"from"} />
    return (
        authState.isLoading ? <Loading /> :
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            <div className="relative max-w-sm w-full">
                <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                <div className="relative w-full rounded-3xl p-8 bg-gray-100 dark:bg-gray-700 shadow-md">
                    <div className="flex flex-col space-y-3 items-center justify-center">
                        <img className="" src="/gome.png" alt="" width="250" />
                        <label className="text-lg text-gray-500 dark:text-white font-semibold">
                            Please login to continue
                        </label>
                    </div>
                    <form className="mt-10" onSubmit={handleSubmit(submitLogin)}>
                        <div>
                            <input
                                {...register('email', {
                                    required: 'Email is required'
                                })}
                                type="email" placeholder="Email" className="px-3 mt-1 block w-full border-none bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                        </div>
            
                        <div className="mt-7">
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password is at least 6 characters' }
                                })}
                                type="password" placeholder="Password" className="px-3 mt-1 block w-full border-none bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>}
                        </div>

                        <div className="mt-7 flex">
                            <label className="inline-flex items-center w-full cursor-pointer">
                                <input
                                    {...register('remember_me')}
                                    type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">Remember me?</span>
                            </label>
                            <div className="w-full text-right">
                                <Link to="/auth/forgot-password">
                                    <span className="underline text-sm text-gray-600 dark:text-gray-100 hover:text-gray-900">Forgot password?</span>
                                </Link>    
                            </div>
                        </div>
            
                        <div className="mt-7">
                            <button
                                type="submit"
                                className={classNames(isSubmitting ? 'cursor-not-allowed opacity-60' : '', 'inline-flex items-center justify-center bg-blue-500 text-white w-full py-3 rounded-xl font-bold shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105')}
                                disabled={isSubmitting}
                            >
                                <svg className={isSubmitting ? 'animate-spin mr-3 h-5 w-5' : 'hidden'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                LOGIN
                            </button>
                        </div>
            
                        <div className="flex mt-7 items-center text-center">
                            <hr className="border-gray-300 border-1 w-full rounded-md" />
                            <label className="block font-medium text-sm text-gray-600 dark:text-gray-100 w-full">
                                <DarkModeButton />
                            </label>
                            <hr className="border-gray-300 dark:border-gray-100 border-1 w-full rounded-md" />
                        </div>
            
                        <div className="mt-7">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-500 dark:text-gray-100">Are you new member?</label>
                                <p className="text-green-400 underline transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    <Link to="/auth/signup">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}