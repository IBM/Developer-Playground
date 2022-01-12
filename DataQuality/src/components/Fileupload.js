/* eslint-disable */
import axios from 'axios';
import { TextInput, FileUploaderItem,FileUploaderDropContainer, ToastNotification } from 'carbon-components-react';
import React, { useState, useCallback, useEffect} from 'react';
let lastId = 0;
function uid(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}

function Fileupload({setuLabelInput, setufilepath, setufilename, ulabelerr}) {

    const [label , setlabel] = useState('');
    const [notifystatus, setnotifystatus] = useState(false);
    const [err1status, seterr1status] = useState(false); 
    
    var global_filename = 'datafolder/data.csv';
    let valid = true;

    const onLabelSubmit = (e) => {

      setlabel(e.target.value)
      setuLabelInput(e.target.value)
      setufilepath(global_filename);
      setufilename('data.csv');
    }

  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
     //console.log(e);
  };

  const handleDragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
     //console.log(e);
     
  };
  
  useEffect(() => {
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragover);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragover);
      
    };
  }, []);

  

  const uploadFile = async (fileToUpload) => {
    // file size validation

    if (fileToUpload.filesize <= 15000000)
    {
        valid = true;
    }
    else
    {
      valid = false;
        const updatedFile = {
            ...fileToUpload,
            status: 'edit',
            iconDescription: 'Delete file',
            invalid: true,
            errorSubject: 'File size exceeds limit',
            errorBody: 'Max file size is 15MB. Select a new file and try again.',
          };
          setFiles((files) =>
            files.map((file) =>
              file.uuid === fileToUpload.uuid ? updatedFile : file
            )
          );
          return;
    }

    // file type validation
    if (fileToUpload.invalidFileType) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      return;
    }

    else {
            valid = true;
        }

    try {
      const response = await fetch(
        'https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1000ms',
        {
          method: 'POST',
          mode: 'cors',
          body: fileToUpload,
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // show x icon after 1 second
      setTimeout(() => {
        const updatedFile = {
          ...fileToUpload,
          status: 'edit',
          iconDescription: 'Remove file',
        };
        setFiles((files) =>
          files.map((file) =>
            file.uuid === fileToUpload.uuid ? updatedFile : file
          )
        );
      }, 1000);
    } 
   catch (error) {
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
        status: 'uploading',
        iconDescription: 'Uploading',
      }));

      if (addedFiles[0]) {

        setFiles([newFiles[0]]);
        uploadFile(newFiles[0]);
       
        if(valid){
          const data = new FormData()
          data.append('file', addedFiles[0])
          let updatedFile;
          try{
             const res = await axios.post("/upload", data, {})
             if(res.status === 200){
                
                updatedFile = {
                        ...newFiles[0],
                        status: "complete",
                        iconDescription: "Upload complete",
                    };
                setnotifystatus(true);
                setufilepath(global_filename);
                setufilename('data.csv');
                console.log("file uploaded"); 
            }
            else{
                  console.log("file not uploaded");
                  seterr1status(true);
              } 

          }
          catch(err){
            updatedFile = {
                        ...newFiles[0],
                        status: "edit",
                        iconDescription: "Upload failed",
                        invalid: true,
                    };
            console.log("Issue with uploaded file");
            seterr1status(true);
          }
             
          }
        }
      else{
        console.log("Issue with uploaded file");
        seterr1status(true);
      }
    };

  const handleFileUploaderItemClick = useCallback(
    (_, { uuid: clickedUuid }) =>
      setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
    [files]
  );

  function notifystatusf() {
    setnotifystatus(false);
  }
  
  function err1closef() {
    seterr1status(false);
  }
	
	return (
  <>
     <div class="bx--form-item">
            <strong class="bx--file--label">Upload File</strong>
            <p class="bx--label-description">Max file size is 15 MB. Supported file type is .csv</p>
            <FileUploaderDropContainer
                labelText="Drag and drop here or click to upload"
                onAddFiles={onAddFiles}
                accept={['.csv']}
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
      </div>
<br/>
     <div className = "LabelArea">
      <TextInput id={'label'} labelText = {'Label Column*'} invalidText="Mandatory field" invalid = {ulabelerr} size = "lg" placeholder = {'Label'} value={label} onChange={onLabelSubmit} />
      </div>

  {notifystatus && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>File Upload Successful</span>}
        timeout={3000}
        onClose = {notifystatusf}
        kind = 'success'
        title="Success Notification"
      />
      }

    {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>File upload failed</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }

  </>

	);
	
}

export default Fileupload;