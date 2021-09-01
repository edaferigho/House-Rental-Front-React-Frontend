import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'


const FileUploadComponent = () => {

    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Add More Files' : 'Select Files <image>'
        console.log(files);

        return (
            <label className="btn_addProperty btn">
                
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
                {textMsg}
            </label>
        )
    }

    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        console.log(status, meta, file) 
    }

    // const onSubmit = (files, allFiles) => {
    //     allFiles.forEach(f => f.remove())
    // }

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }


    return (
        <Dropzone
            // onSubmit={onSubmit}
            getFilesFromEvent={getFilesFromEvent}
            InputComponent={selectFileInput}
            onChangeStatus={onFileChange}
            getUploadParams={fileParams}
            
            accept="image/*,audio/*,video/*"
            maxFiles={10}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 790, height: 320, borderColor: "#089BC9", borderRadius: "12px", paddingTop: '0px' },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
    );
};

export default FileUploadComponent;