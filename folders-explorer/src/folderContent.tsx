import React from 'react';
import './App.css';
import {FileFolder} from './foldersGeneartor'
interface Props {
    folderContent: Array<FileFolder>,
    setFolder:(fileFolder:FileFolder)=>any
   
  
  }

  function FolderContent(props:Props) {

  
    return (
      
              <div className="Folder-Content">Content:
              <ul>
                  {props.folderContent.map((item, index) => {
                    let fileContent = item.fileContent
                    if (fileContent === null) {
                      return <li key={index} className="Sub-Folder" onClick={() => {
                        { props.setFolder(item) }
                      }} >{item.displayName}</li>
                    }
                    else {
                      return <li key={index} className="File" ><span className="File-Content-Header">File name: </span><span>{item.displayName},</span> <span
                        className="File-Content-Header">updated at: </span>
                        <span >{fileContent.lastUpdated.updatedAt},</span>
                        <span className="File-Content-Header">updated by: </span><span>{fileContent.lastUpdated.updatedBy}</span></li>
                    }
                  })}
                </ul>
              </div>
           
      );
    }
    export default React.memo(FolderContent);
     