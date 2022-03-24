import Dropzone, { IDropzoneProps, ILayoutProps } from "react-dropzone-uploader"
import "react-dropzone-uploader/dist/styles.css"

const Layout = ({ input, previews, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
    return (
        <>
            {previews?.length ? (
                <>
                    <p className="m-2 text-right">
                        Image name: <span className="text-indigo-500">{files[0]?.file?.name}</span>
                    </p>
                    {previews}
                </>
            ) : null}
            {files?.length < maxFiles && <div {...dropzoneProps}>{input}</div>}
        </>
    )
}

export default function ImageUploader({ setThumb }: any) {
    // const getUploadParams: IDropzoneProps["getUploadParams"] = ({ file, meta }) => {
    //     return { url: "/abc" }
    // }

    const handleChangeStatus: IDropzoneProps["onChangeStatus"] = ({ file, meta }) => {
        console.log({ file, meta })
        setThumb(file)
    }

    const handleSubmit: IDropzoneProps["onSubmit"] = (files, allFiles) => {
        console.log(files.map((f, i) => f.meta))
        allFiles.forEach((f) => f.remove())
    }

    return (
        <Dropzone
            LayoutComponent={Layout}
            // getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            onChangeStatus={handleChangeStatus}
            accept="image/*"
            maxFiles={1}
            multiple={false}
            canCancel={false}
            autoUpload={false}
            submitButtonDisabled={(files) => files.length < 1}
            inputContent={
                <div className="flex flex-col items-center text-indigo-800 dark:text-slate-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-sm">Drag and Drop Image to Upload</p>
                </div>
            }
            styles={{ dropzone: { minHeight: 100, maxHeight: 250, border: "1px solid gray" } }}
        />
    )
}
