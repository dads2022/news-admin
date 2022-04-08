import { useEffect, useState } from "react"
import axios from "axios"

export default function Overview() {
    const [postList, setPostList] = useState([])
    const getPostList = async () => {
        try {
            const res = await axios.get(`${window.dads.REACT_APP_API}/content/post`)
            const result = await res.data
            setPostList(result.data)
        } catch (error) {}
    }
    useEffect(() => {
        getPostList()
    }, [])

    return (
        <section className="space-y-4">
            <h4 className="uppercase font-bold mt-4">Post</h4>
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow rounded">
                <div className="p-2">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full divide-y">
                            <thead className="text-xs text-fuchsia-900 dark:text-fuchsia-300 uppercase">
                                <tr>
                                    <th className="p-2 font-semibold text-left">ID</th>
                                    <th className="p-2 font-semibold text-center">Thumbnail</th>
                                    <th className="p-2 font-semibold text-left">Title</th>
                                    <th className="p-2 font-semibold text-left">Category</th>
                                    <th className="p-2 font-semibold text-left">Author</th>
                                    <th className="p-2 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                {!postList.length ? (
                                    <tr>Nothing</tr>
                                ) : (
                                    postList.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="p-2">{item.id}</td>
                                            <td className="p-2 flex justify-center">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={`thumbnail of ${item.id}`}
                                                    width="50"
                                                    height="auto"
                                                />
                                            </td>
                                            <td className="p-2">{item.title}</td>
                                            <td className="p-2">{item.category.title}</td>
                                            <td className="p-2">{item.user.name}</td>
                                            <td className="p-2 text-right">
                                                <div className="inline-flex space-x-2">
                                                    <button
                                                        className="bg-green-500 text-white hover:bg-green-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                        type="button"
                                                    >
                                                        UPDATE
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white hover:bg-red-600 hover:text-white font-bold text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                                        type="button"
                                                    >
                                                        DELETE
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
