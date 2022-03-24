import { Fragment, useState, useRef, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

import { useForm } from "react-hook-form"
import ImageUploader from "../../../modules/ImageUploader"
import axios from "axios"

const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
]

export default function Post() {
    const [selected, setSelected] = useState(people[0])
    const [query, setQuery] = useState("")

    const filteredPeople =
        query === ""
            ? people
            : people.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              )
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm()
    const typingContentRef = useRef<NodeJS.Timeout | null>(null)
    const handlePostContent = (e: any, editor: any) => {
        const content = editor.getData()
        if (typingContentRef.current) {
            clearTimeout(typingContentRef.current)
        }
        typingContentRef.current = setTimeout(() => {
            setValue("content", content)
        }, 300)
    }

    const handleSubmitThumb = () => {
        console.log(123)
    }
    const [thumb, setThumb] = useState({})

    const handleSubmitAddPost = async (data: any) => {
        console.log(thumb)
        const formData = new FormData()
        formData.append("data", JSON.stringify(data))
        formData.append("thumb", thumb as any)
        const res = await axios.post("/", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
    }
    return (
        <form onSubmit={handleSubmit(handleSubmitAddPost)}>
            <section className="space-y-4">
                <h4 className="uppercase font-bold">Category</h4>
                <div className="w-full inline-flex items-center">
                    <div className="w-full">
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative">
                                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-slate-600 rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon
                                            className="w-5 h-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white dark:bg-slate-600 rounded shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                        {people.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                        active && "text-amber-900 bg-amber-100"
                                                    }`
                                                }
                                                {...register("category", { value: person.id })}
                                                value={person}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-bold"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected && (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="w-1/6 flex justify-end">
                        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
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
                                    required: "Title is required",
                                    minLength: {
                                        value: 4,
                                        message: "Title is at least 4 characters",
                                    },
                                })}
                                type="text"
                                placeholder="Add title..."
                                className="bg-white dark:bg-slate-600 border-none border-gray-300 placeholder-gray-300 text-sm rounded focus:ring-slate-200 block w-full p-2.5 dark:border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-500 dark:text-gray-200 mb-3 md:mb-0 pr-4">
                            Content
                        </label>
                        <CKEditor
                            className="bg-white dark:bg-black"
                            config={{
                                ckfinder: {
                                    openMethod: "popup",
                                    uploadUrl: "https://app.gome.io",
                                },
                            }}
                            editor={ClassicEditor}
                            onReady={(editor: any) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor)
                                editor.editing.view.change((writer: any) => {
                                    writer.setStyle(
                                        "height",
                                        "450px",
                                        editor.editing.view.document.getRoot()
                                    )
                                })
                            }}
                            onChange={handlePostContent}
                        />
                    </div>
                    <div className="w-full space-y-2">
                        <label className="block text-gray-500 dark:text-gray-200 mb-3 md:mb-0 pr-4">
                            Thumbnail
                        </label>
                        <div className="flex items-center">
                            <div className="w-60 bg-white dark:bg-slate-600">
                                <ImageUploader setThumb={setThumb} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mt-10">
                <button className="px-4 py-2 rounded bg-indigo-500 text-white">SUBMIT</button>
            </div>
        </form>
    )
}
