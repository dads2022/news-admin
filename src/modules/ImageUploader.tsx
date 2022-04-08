import { useEffect, useState } from "react"
import Dropzone, { IDropzoneProps, ILayoutProps } from "react-dropzone-uploader"
import "react-dropzone-uploader/dist/styles.css"

const Layout = ({ input, previews, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
    return (
        <>
            {previews?.length ? (
                <>
                    <p className="m-2 text-indigo-500">{files[0]?.file?.name}</p>
                    {previews}
                </>
            ) : null}
            {files?.length < maxFiles && <div {...dropzoneProps}>{input}</div>}
        </>
    )
}

export default function ImageUploader({ setThumb }: any) {
    const [file, setFile] = useState({})
    // const getUploadParams: IDropzoneProps["getUploadParams"] = ({ file, meta }) => {
    //     return { url: "/abc" }
    // }
    const handleChangeStatus: IDropzoneProps["onChangeStatus"] = (fileWithMeta) => {
        setThumb(fileWithMeta.file)
    }
    const handleSubmit: IDropzoneProps["onSubmit"] = (files, allFiles) => {
        console.log(files.map((f, i) => f.meta))
        allFiles.forEach((f) => f.remove())
    }
    return (
        <Dropzone
            LayoutComponent={Layout}
            // PreviewComponent={Preview}
            // getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            // onSubmit={handleSubmit}
            accept="image/*"
            maxFiles={1}
            multiple={false}
            canCancel={false}
            autoUpload={false}
            // submitButtonDisabled={(files) => files.length < 1}
            inputContent={
                <div className="flex flex-col items-center text-indigo-800 dark:text-slate-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            fill="currentColor"
                            d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"
                        />
                    </svg>
                    <p className="text-sm">Drag and Drop Image to Upload</p>
                </div>
            }
            styles={{ dropzone: { minHeight: 100, maxHeight: 250, border: "1px solid gray" } }}
        />
    )
}
