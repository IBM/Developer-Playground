import { FileUploaderItem, FileUploaderDropContainer, ToastNotification } from "carbon-components-react"
import React, { useState, useCallback } from "react";
import axios from "axios";

let lastId = 0;
function uid(prefix = "id") {
    lastId++;
    return `${prefix}${lastId}`;
}
let valid = true
const FileUpload = ({ accept, sendDataToParent }) => {
    const [files, setFiles] = useState([]);
    const [showNotif, setNotification] = useState(false)
    const [notifData, setNotifData] = useState({
        kind: "",
        subtitle: "",
        title: ""

    })

    const validSize = name => {
        console.log(name)
        let fileNameSplit = name.split('.')
        let fileType = fileNameSplit[fileNameSplit.length - 1]
        if (fileType === "csv")
            return 5000000
        else
            return 10000000
    }

    const uploadFile = async (fileToUpload) => {
        // file size validation
        console.log("file to upload: " + JSON.stringify(fileToUpload))
        if (fileToUpload.filesize <= validSize(fileToUpload.name)) {
            valid = true;
        } else {
            valid = false;
            const updatedFile = {
                ...fileToUpload,
                status: "edit",
                iconDescription: "Delete file",
                invalid: true,
                errorSubject: "File size exceeds limit",
                errorBody: `Max file size is ${fileToUpload.name.split(".")[fileToUpload.name.split(".").length - 1] === "csv" ? 5 : 10}MB. Select a new file and try again.`,
            };
            setFiles((files) =>
                files.map((file) =>
                    file.uuid === fileToUpload.uuid ? updatedFile : file
                )
            );
            return;
        }
        console.log(fileToUpload);
        // file type validation
        if (fileToUpload.invalidFileType) {
            valid = false;
            const updatedFile = {
                ...fileToUpload,
                status: "edit",
                iconDescription: "Delete file",
                invalid: true,
                errorSubject: "Invalid file type",
                errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
            };
            setFiles((files) =>
                files.map((file) =>
                    file.uuid === fileToUpload.uuid ? updatedFile : file
                )
            );
            return;
        } else {
            valid = true;
        }
        try {
            const response = await fetch(
                "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1000ms",
                {
                    method: "POST",
                    mode: "cors",
                    body: fileToUpload,
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            

            // show x icon after 1 second
            setTimeout(() => {
                const updatedFile = {
                    ...fileToUpload,
                    status: "edit",
                    iconDescription: "Remove file",
                };
                setFiles((files) =>
                    files.map((file) =>
                        file.uuid === fileToUpload.uuid ? updatedFile : file
                    )
                );
            }, 1000);
        } catch (error) {
            valid = false;
            const updatedFile = {
                ...fileToUpload,
                status: "edit",
                iconDescription: "Upload failed",
                invalid: true,
            };
            setFiles((files) =>
                files.map((file) =>
                    file.uuid === fileToUpload.uuid ? updatedFile : file
                )
            );
            //console.log(error);
        }
    };

    const onAddFiles = async (evt, { addedFiles }) => {
        evt.stopPropagation();
        const newFiles = addedFiles.map((file) => ({
            uuid: uid(),
            name: file.name,
            filesize: file.size,
            status: "uploading",
            iconDescription: "Uploading",
        }));
        if (addedFiles[0]) {
            setFiles([newFiles[0]]);
            uploadFile(newFiles[0]);
            if (valid) {
                const data = new FormData()
                data.append('file', addedFiles[0])
                let updatedFile;
                try {
                    const res = await axios.post("/upload", data, {})
                    sendDataToParent(res)
                    updatedFile = {
                        ...newFiles[0],
                        status: "complete",
                        iconDescription: "Upload complete",
                    };
                    setNotifData({
                        kind: "success",
                        subtitle: "File uploaded successfully",
                        title: "Success"
                    })
                    setNotification(true)
                } catch(err) {
                    setNotifData({
                        kind: "error",
                        subtitle: err.response.data.msg,
                        title: "Error"
                    })
                    setNotification(true)
                    updatedFile = {
                        ...newFiles[0],
                        status: "edit",
                        iconDescription: "Upload failed",
                        invalid: true,
                    };
                } finally {
                    setFiles((files) =>
                        files.map((file) =>
                            file.uuid === newFiles[0].uuid ? updatedFile : file
                        )
                    );
                }
            }
        } else {
            //console.log("No file uploaded");
        }
    };

    const handleFileUploaderItemClick = useCallback(
        (_, { uuid: clickedUuid }) =>
            setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
        [files]
    );

    return (
        <div class="bx--form-item">
            <strong class="bx--file--label">Upload File</strong>
            <p class="bx--label-description">Supported file types are .json and .csv. Max file size is 10MB for .json and 5MB for .csv.</p>
            <FileUploaderDropContainer
                labelText="Drag and drop here or click to upload"
                onAddFiles={onAddFiles}
                accept={accept}
            />
            <div className="uploaded-files" style={{ width: "100%" }}>
                {files.map(
                    ({
                        uuid,
                        name,
                        filesize,
                        status,
                        iconDescription,
                        invalid,
                        ...rest
                    }) => (
                        <FileUploaderItem
                            key={uid()}
                            uuid={uuid}
                            name={name}
                            filesize={filesize}
                            size="lg"
                            status={status}
                            iconDescription={iconDescription}
                            invalid={invalid}
                            onDelete={handleFileUploaderItemClick}
                            {...rest}
                        />))}
            </div>
            {showNotif ?
                <ToastNotification
                    kind={notifData.kind}
                    iconDescription="Close notification"
                    subtitle={<span>{notifData.subtitle}</span>}
                    timeout={3000}
                    onCloseButtonClick={() => setNotification(false)}
                    title={notifData.title}
                    caption=""
                /> : null}
        </div>
    )
}

export default FileUpload;