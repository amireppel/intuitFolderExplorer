import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data'
import {insertToTree, FileFolder} from './foldersGeneartor'

function App() {
  const [fileFolder, setFolder] = useState<FileFolder | null>(null)

  
  useEffect(() => {
    /*default root folder*/
    let folderBase: FileFolder = { parentFolder: null, folderContent: null, fileContent: null, displayName: 'projectExplorer' }

    data.forEach((item, index) => {
      let idNoSpaces = item.id.replace(/\s/g, '').split(':')
      folderBase = insertToTree(folderBase, idNoSpaces, { lastUpdated: item.lastUpdated })
    })

    setFolder(folderBase)
  },
    [])
  let i = true
  let parentFoldersArray = []
  if (fileFolder !== null) {
    let parentFolder = fileFolder.parentFolder
    while (i !== false) {
      if (parentFolder !== null) {
        parentFoldersArray.unshift(parentFolder)
        parentFolder = parentFolder.parentFolder
      }
      else {
        i = false
      }
    }
  }
  return (
    <div className="App">
      {fileFolder !== null ? <div>
        <div className="App-Header">Folder Explorer</div>
        {fileFolder.parentFolder !== null ? (<div className="Back-Arrow" onClick={() => setFolder(fileFolder.parentFolder)}>&#8629;</div>) : <div className="Root-Folder"></div>}
        <div className="Folder-Name-Title">Folder name:</div>

        <div className="Folder-Name">

          {parentFoldersArray.map((item, index) => {
            return <div key={index} className="Parent-Folder" onClick={() => setFolder(item)}
            >{item.displayName}/</div>
          })}
          <div className="Current-Folder">{fileFolder.displayName}</div>

        </div>
        {(fileFolder.folderContent !== null && fileFolder.folderContent.length > 0) ?
          <div className="Folder-Content">Content:
          <ul>
              {fileFolder.folderContent.map((item, index) => {
                let fileContent = item.fileContent
                if (fileContent === null) {
                  return <li key={index} className="Sub-Folder" onClick={() => {
                    { setFolder(item) }
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
          : null}
      </div> : null}

    </div>
  );
}
export default App;
