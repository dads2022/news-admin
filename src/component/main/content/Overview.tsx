import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { Dialog, Transition } from "@headlessui/react"
import { toastPushNotification } from "../../../utils/Helper"
import { Link } from "react-router-dom"

interface IPublishModal {
    isOpen: boolean
    id: any
    status: any
}

interface IDeleteModal {
    isOpen: boolean
    id: any
}

export default function Overview() {
    const [publishModal, setPublishModal] = useState<IPublishModal>({
        isOpen: false,
        id: null,
        status: null,
    })
    const [deleteModal, setDeleteModal] = useState<IDeleteModal>({
        isOpen: false,
        id: null,
    })
    const [postList, setPostList] = useState([])
    const getPostList = async () => {
        try {
            const res = await axios.get(`${window.dads.REACT_APP_API}/content/post`)
            const result = await res.data
            setPostList(result.data)
            toastPushNotification(result.message, "success")
        } catch (error) {}
    }
    useEffect(() => {
        getPostList()
    }, [])
    const handlePublishPost = async (id: number, status: string) => {
        console.log({ id, status })
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/content/post/publish`, {
                id,
                status,
            })
            const result = await res.data
            setPublishModal((state: any) => ({
                ...state,
                isOpen: false,
            }))
            toastPushNotification(result.message, "success")
            getPostList()
        } catch (error) {}
    }
    const handleDeletePost = async (id: number) => {
        try {
            const res = await axios.delete(`${window.dads.REACT_APP_API}/content/post`, {
                data: { id },
            })
            const result = await res.data
            setDeleteModal((state: any) => ({
                ...state,
                isOpen: false,
            }))
            toastPushNotification(result.message, "success")
            getPostList()
        } catch (error) {}
    }
    return (
        <>
            <section className="space-y-4">
                <h4 className="uppercase font-bold mt-4">Post</h4>
                <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow rounded">
                    <div className="p-2">
                        <div className="overflow-x-auto">
                            {!postList || !postList.length ? (
                                <div className="flex flex-col items-center space-y-5 py-2">
                                    <p className="">Have no any posts...</p>
                                    <button className="btn text-green-500">
                                        <svg
                                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                                        </svg>
                                        <span className="hidden xs:block ml-2">Add New</span>
                                    </button>
                                </div>
                            ) : (
                                <table className="table-auto w-full divide-y">
                                    <thead className="text-xs text-fuchsia-900 dark:text-fuchsia-300 uppercase">
                                        <tr>
                                            <th className="p-2 font-semibold text-left">ID</th>
                                            <th className="p-2 font-semibold text-center">
                                                Thumbnail
                                            </th>
                                            <th className="p-2 font-semibold text-left">Title</th>
                                            <th className="p-2 font-semibold text-left">
                                                Category
                                            </th>
                                            <th className="p-2 font-semibold text-left">Author</th>
                                            <th className="p-2 font-semibold text-center">
                                                Status
                                            </th>
                                            <th className="p-2 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                        {postList.map((item: any) => (
                                            <tr key={item.id}>
                                                <td className="p-2">{item.id}</td>
                                                <td className="p-2">
                                                    <img
                                                        className="mx-auto"
                                                        src={item.thumbnail}
                                                        alt={`thumbnail of ${item.id}`}
                                                        width="100"
                                                        height="auto"
                                                    />
                                                </td>
                                                <td className="p-2">{item.title}</td>
                                                <td className="p-2">{item.category.title}</td>
                                                <td className="p-2">{item.user.name}</td>
                                                <td className="p-2 text-center">
                                                    {!item.published ? (
                                                        <span
                                                            onClick={() =>
                                                                setPublishModal((state: any) => ({
                                                                    ...state,
                                                                    isOpen: true,
                                                                    id: item.id,
                                                                    status: "unpublished",
                                                                }))
                                                            }
                                                            className="has-tooltip cursor-pointer text-red-500 dark:text-red-300 inline-flex justify-center font-bold text-xs rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            <span className="ml-2">
                                                                Unpublished
                                                            </span>
                                                            <span className="tooltip px-2 py-1 rounded bg-gray-600 text-gray-100 mt-8 shadow-lg text-xs">
                                                                Click to change status
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            onClick={() =>
                                                                setPublishModal((state: any) => ({
                                                                    ...state,
                                                                    isOpen: true,
                                                                    id: item.id,
                                                                    status: "published",
                                                                }))
                                                            }
                                                            className="has-tooltip cursor-pointer text-green-500 dark:text-green-300 inline-flex justify-center font-bold text-xs rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            <span className="ml-2">Published</span>
                                                            <span className="tooltip px-2 py-1 rounded bg-gray-600 text-gray-100 mt-8 shadow-lg text-xs">
                                                                Click to change status
                                                            </span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 text-right">
                                                    <div className="inline-flex space-x-2">
                                                        <button
                                                            className="bg-violet-500 text-white hover:bg-violet-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            VIEW
                                                        </button>

                                                        <Link to={`/content/update/${item.id}`}>
                                                            <button
                                                                className="bg-green-500 text-white hover:bg-green-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                                type="button"
                                                            >
                                                                UPDATE
                                                            </button>
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                setDeleteModal((state: any) => ({
                                                                    ...state,
                                                                    isOpen: true,
                                                                    id: item.id,
                                                                }))
                                                            }
                                                            className="bg-red-500 text-white hover:bg-red-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* modal publish post */}
            <Transition appear show={publishModal.isOpen} as={Fragment}>
                <Dialog
                    as="section"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() =>
                        setPublishModal((state: any) => ({
                            ...state,
                            isOpen: false,
                            id: null,
                        }))
                    }
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-6 bg-red-50 dark:bg-slate-800 overflow-hidden text-left align-middle transition-all transform shadow rounded-lg space-y-4">
                                <Dialog.Title as="h3" className="text-lg font-bold leading-6">
                                    Do you want to{" "}
                                    {publishModal.status === "publish" ? "unpublish" : "publish"}{" "}
                                    this post?
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="inline-flex space-x-2">
                                        <button
                                            onClick={() =>
                                                setPublishModal((state: any) => ({
                                                    ...state,
                                                    isOpen: false,
                                                    id: null,
                                                    status: null,
                                                }))
                                            }
                                            className="bg-slate-200 hover:bg-gray-300 text-slate-500 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            onClick={() =>
                                                handlePublishPost(
                                                    publishModal.id,
                                                    publishModal.status
                                                )
                                            }
                                            className={classNames(
                                                publishModal.status === "published"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-green-500 hover:bg-green-600",
                                                "text-white hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                            )}
                                            type="button"
                                        >
                                            {publishModal.status === "published"
                                                ? "UNPUBLISH"
                                                : "PUBLISH"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            {/* modal delete */}
            <Transition appear show={deleteModal.isOpen} as={Fragment}>
                <Dialog
                    as="section"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() =>
                        setDeleteModal((state: any) => ({
                            ...state,
                            isOpen: false,
                            id: null,
                        }))
                    }
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-6 bg-red-50 dark:bg-slate-800 overflow-hidden text-left align-middle transition-all transform shadow rounded-lg space-y-4">
                                <Dialog.Title as="h3" className="text-lg font-bold leading-6">
                                    Do you want to delete this post?
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="inline-flex space-x-2">
                                        <button
                                            onClick={() =>
                                                setDeleteModal((state: any) => ({
                                                    ...state,
                                                    isOpen: false,
                                                    id: null,
                                                }))
                                            }
                                            className="bg-slate-200 text-slate-500 hover:bg-gray-300 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(deleteModal.id)}
                                            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}
