import axios from 'axios';
import { Button,TextInput, ToastNotification } from 'carbon-components-react';
// import { settings } from 'carbon-components';
import {
  FileUploaderItem,
  FileUploaderDropContainer,
} from 'carbon-components-react';
import React, { useState, useCallback, useEffect} from 'react';
let lastId = 0;
function uid(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}

// const { prefix } = settings;

function Filetest({setuLabelInput, setufilepath, setufilename, ulabelerr}) {

    const [selectedFile, setselectedFile] = useState({});
    const [loaded, setloaded] = useState(1);
    const [label , setlabel] = useState('');
    const [uploadbuttonstate, setuploadbuttonstate] = useState(false);
    const [notifystatus, setnotifystatus] = useState(false);

    
    var global_filename = 'datafolder/data.csv';

    const onLabelSubmit = (e) => {

      setlabel(e.target.value)
      setuLabelInput(e.target.value)
      setufilepath(global_filename);
      setufilename('data.csv');
    }

    const onChangeHandler = (event) => {

      setselectedFile(event.target.files[0]);
      setloaded(0);
    }

  const onClickHandler = () => {
    // console.log("click handler ",selectedFile);

   const data = new FormData()
   data.append('file', selectedFile)
   axios.post("/upload", data, { 
  })
  .then(res => { 
    console.log("file response:", res);

   if(res.status === 200 && loaded === 0){
      //alert("File Upload Successful");
      setnotifystatus(true);
      setufilepath(global_filename);
      setufilename('data.csv');
    }


 })
}
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
     e.stopPropagation();
     console.log(e);
  };

  const handleDragover = (e) => {
    e.preventDefault();
     e.stopPropagation();
     console.log(e);
     
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
    setuploadbuttonstate(false);
}
else
{
     const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: 'Max file size is 15MB. Select a new file and try again.',
      };
      setuploadbuttonstate(true);
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
      const updatedFile = {
        ...fileToUpload,
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );

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
    } catch (error) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Upload failed',
        invalid: true,
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      console.log(error);
    }
  };


const onAddFiles = useCallback((evt, { addedFiles }) => {
    evt.stopPropagation();
    const newFiles = addedFiles.map((file) => ({
        uuid: uid(),
        name: file.name,
        filesize: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
      }));
    console.log("addedFiles[0]")
      if (addedFiles[0]) {
        console.log("addedFiles[0]:", addedFiles[0]);
        setloaded(0);
        setFiles([newFiles[0]]);
        uploadFile(newFiles[0]);
        setselectedFile(addedFiles[0]);
        
        }
      else{
        console.log("No file uploaded : filetest");
      }
    }
  );

  const handleFileUploaderItemClick = useCallback(
    (_, { uuid: clickedUuid }) =>
      setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
    [files]
  );

  function notifystatusf() {
    setnotifystatus(false);
  }

	
	return (

    <div className="bx--file__container" >

      <FileUploaderDropContainer
        // name="productLogo"
        labelText="Drag and drop here or click to upload"
        onAddFiles={onAddFiles}
        accept={['.csv']}
         />

       {/* <FileUploaderDropContainer accept={['.csv']} onAddFiles={onAddFiles} /> */}
      <div className="uploaded-files" style={{ width: '100%' }}>
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
            />
          )
        )}
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

      <div className="ButtonArea">
         <Button type="submit" disabled = {uploadbuttonstate} onClick= {onClickHandler} >Upload </Button>
      </div>

    
    <div className = "LabelArea">
      <TextInput id={'label'} labelText = {'Label Column*'} invalidText="Mandatory field" invalid = {ulabelerr} size = "lg" placeholder = {'Label'} value={label} onChange={onLabelSubmit} />
      </div>

      </div>

	);
	
}

export default Filetest;