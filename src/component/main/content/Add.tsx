import { Fragment, useState, useRef, useEffect } from "react"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "ckeditor5-build-classic-dna"

import { useForm } from "react-hook-form"
import ImageUploader from "../../../modules/ImageUploader"
import axios from "axios"
import { toastPushNotification } from "../../../utils/Helper"

export default function AddPost() {
    const [categoriesList, setCategoriesList]: [any, any] = useState([])
    const [selectedCategory, setSelectedCategory]: [any, any] = useState({})
    const [query, setQuery] = useState("")
    const filteredCategory =
        query === ""
            ? categoriesList
            : categoriesList.filter((item: any) =>
                  item.title
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              )
    const getCategories = async () => {
        try {
            const res = await axios.get(`${window.dads.REACT_APP_API}/content/category`)
            const result = await res.data
            setCategoriesList(result.data)
            setSelectedCategory(result.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false)
    const {
        handleSubmit: handleSubmit2,
        reset: reset2,
        register: register2,
        formState: { errors: errors2, isSubmitting: isSubmitting2 },
    } = useForm() // add category
    const handleSubmitAddCategory = async (data: any) => {
        try {
            const res = await axios.post(`${window.dads.REACT_APP_API}/content/category`, data)
            const result = await res.data
            toastPushNotification(result.message, "success")
            getCategories()
            setIsOpenCategoryModal(false)
            reset2()
        } catch (error) {
            console.log(error)
        }
    }
    const {
        register,
        reset,
        resetField,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm() // add post

    const typingContentRef = useRef<NodeJS.Timeout | null>(null)
    const handlePostContent = async (e: any, editor: any) => {
        const content = await editor.getData()
        if (typingContentRef.current) {
            clearTimeout(typingContentRef.current)
        }
        typingContentRef.current = setTimeout(() => {
            setValue("content", content)
        }, 300)
    }

    const [thumb, setThumb]: [any, any] = useState({})
    const handleSubmitAddPost = async (data: any) => {
        try {
            if (!Object.keys(thumb).length) {
                toastPushNotification("Please upload thumbnail!", "error")
                return
            }
            data.categoryId = selectedCategory.id
            const formData = new FormData()
            formData.append("data", JSON.stringify(data))
            formData.append("thumb", thumb)
            const res = await axios({
                method: "POST",
                url: `${window.dads.REACT_APP_API}/content/post`,
                data: formData,
                headers: { Accept: "application/json", "Content-type": "multipart/form-data" },
            })
            const result = await res.data
            toastPushNotification(result.message, "success")
            reset()
        } catch (error: any) {
            error.response.status === 500 &&
                toastPushNotification("File is over 1mb, please upload lower size", "warning")
            resetField("content")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitAddPost)}>
                <section className="space-y-4">
                    <h4 className="uppercase font-bold">Category</h4>
                    <div className="w-full inline-flex items-center">
                        <div className="w-full">
                            <Combobox value={selectedCategory} onChange={setSelectedCategory}>
                                <div className="relative">
                                    <div className="relative w-full text-left rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                                        <Combobox.Input
                                            className="w-full bg-white dark:bg-slate-700 border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5"
                                            onChange={(e) => setQuery(e.target.value)}
                                            displayValue={(cate: any) =>
                                                cate.title ?? "Have no category, please add new"
                                            }
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <SelectorIcon
                                                className="w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </Combobox.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setQuery("")}
                                    >
                                        <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white dark:bg-slate-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {!filteredCategory.length && query !== "" ? (
                                                <div className="cursor-default select-none relative py-2 px-4">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                filteredCategory.map((category: any) => (
                                                    <Combobox.Option
                                                        key={category.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                "cursor-default select-none relative py-2 pl-10 pr-4",
                                                                active
                                                                    ? "text-white bg-teal-600"
                                                                    : ""
                                                            )
                                                        }
                                                        value={category}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span
                                                                    className={classNames(
                                                                        "block truncate",
                                                                        selected
                                                                            ? "font-medium"
                                                                            : "font-normal"
                                                                    )}
                                                                >
                                                                    {category.title}
                                                                </span>
                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            "absolute inset-y-0 left-0 flex items-center pl-3",
                                                                            active
                                                                                ? "text-white"
                                                                                : "text-teal-600"
                                                                        )}
                                                                    >
                                                                        <CheckIcon
                                                                            className="w-5 h-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </div>
                        <div className="w-1/6 flex justify-end">
                            <button
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={() => setIsOpenCategoryModal(true)}
                            >
                                <svg
                                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                                </svg>
                                <span className="hidden xs:block ml-2">Add New</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mt-10 space-y-4">
                    <h4 className="uppercase font-bold mt-4">Post</h4>
                    <div className="space-y-4">
                        <div className="flex items-center w-full">
                            <div className="md:w-1/6">
                                <label className="block text-gray-500 dark:text-gray-200 mb-3 md:mb-0 pr-4">
                                    Title
                                </label>
                            </div>
                            <div className="w-full">
                                <input
                                    {...register("title", {
                                        required: "* Title is required",
                                        minLength: {
                                            value: 4,
                                            message: "* Title is at least 4 characters",
                                        },
                                    })}
                                    type="text"
                                    placeholder="Add title..."
                                    className="bg-white dark:bg-slate-600 border-none border-gray-300 placeholder-gray-300 text-sm rounded focus:ring-slate-200 block w-full p-2.5 dark:border-gray-400"
                                />
                            </div>
                        </div>
                        {errors.title && (
                            <p className="mt-3 text-right text-xs text-red-500 dark:text-red-300">
                                {errors.title.message}
                            </p>
                        )}
                        <div className="space-y-2">
                            <label className="block text-gray-500 dark:text-gray-200 mb-3 md:mb-0 pr-4">
                                Content
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    image: {
                                        toolbar: [
                                            "imageStyle:inline",
                                            "imageStyle:block",
                                            "imageStyle:side",
                                            "|",
                                            "toggleImageCaption",
                                            "imageTextAlternative",
                                        ],
                                    },
                                }}
                                data={getValues("content") ?? ""}
                                // editor={ClassicEditor}
                                onReady={(editor: any) => {
                                    // You can store the "editor" and use when it is needed.
                                    register("content", {
                                        required: "* Content is required",
                                    })
                                    editor.editing.view.change((writer: any) => {
                                        writer.setStyle(
                                            {
                                                height: "800px",
                                                "font-size": "13px",
                                                color: "black",
                                            },
                                            editor.editing.view.document.getRoot()
                                        )
                                    })
                                    // editor.ui.view.element.classList.add("dark:bg-black")
                                }}
                                onChange={handlePostContent}
                            />
                        </div>
                        {errors.content && (
                            <p className="mt-3 text-xs text-right text-red-500 dark:text-red-300">
                                {errors.content.message}
                            </p>
                        )}
                        <div className="w-full space-y-2">
                            <label className="block text-gray-500 dark:text-gray-200 mb-3 md:mb-0 pr-4">
                                Thumbnail
                            </label>
                            <div className="flex items-center">
                                <div className="w-60 bg-white dark:bg-slate-600">
                                    {!isSubmitting && <ImageUploader setThumb={setThumb} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mt-10">
                    <button
                        type="submit"
                        className={classNames(
                            isSubmitting ? "cursor-not-allowed opacity-60" : "",
                            "px-4 py-2 rounded bg-indigo-500 text-white"
                        )}
                    >
                        <svg
                            className={isSubmitting ? "animate-spin mr-2 h-5 w-5" : "hidden"}
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
                        SUBMIT
                    </button>
                </div>
            </form>
            {/* modal */}
            <Transition appear show={isOpenCategoryModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setIsOpenCategoryModal(false)}
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

                        {/* This element is to trick the browser into centering the modal contents. */}
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
                            <form
                                className="inline-block w-full max-w-2xl p-6 my-8 space-y-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl bg-white dark:bg-black"
                                onSubmit={handleSubmit2(handleSubmitAddCategory)}
                            >
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                                    Create new category
                                </Dialog.Title>
                                <input
                                    {...register2("category", {
                                        required: "Category name is required",
                                        minLength: {
                                            value: 4,
                                            message: "Category name is at least 4 characters",
                                        },
                                    })}
                                    type="text"
                                    placeholder="Add category 's name..."
                                    className="bg-white dark:bg-slate-600 border-none border-gray-300 dark:border-gray-400 placeholder-gray-300 text-sm rounded block w-full p-2.5"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                >
                                    Add
                                </button>
                            </form>
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
