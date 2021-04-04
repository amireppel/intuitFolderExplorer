import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data'
type FileContent = {
  lastUpdated: {
    updatedAt: string;
    updatedBy: string;
  }
}
type FileFolder = {
  parentFolder: FileFolder | null;
  folderContent: Array<FileFolder> | null;
  fileContent: FileContent | null;
  displayName: string;
}
interface GenerateFolder {
  parentFolder: FileFolder | null,
  foldersList: Array<string>, content: FileContent | null
}
function App() {
  const [fileFolder, setFolder] = useState<FileFolder | null>(null)
  const insertToTree = (parentFolder: FileFolder,
    foldersList: Array<string>, content: FileContent | null): FileFolder => {
    /*when reaching last name in the list, its the file name the inserting the file and return
    */
    let currentName = '';
    currentName = foldersList.shift() || ''
    if (parentFolder.folderContent == null) {
      parentFolder.folderContent = []
    }
    if (foldersList.length == 0) {
      let newFile = {
        parentFolder: parentFolder, displayName: currentName, fileContent: content,
        folderContent: null
      }
      parentFolder.folderContent.push(newFile)
    }
    else {
      let folder = parentFolder.folderContent.find(folder => folder.displayName == currentName)
      if (folder === undefined) {
        folder = { parentFolder: parentFolder, displayName: currentName, fileContent: null, folderContent: [] }
        parentFolder.folderContent.push(folder)
      }
      insertToTree(folder, foldersList, content)
    }
    return parentFolder
  }
  useEffect(() => {
    let folderBase: FileFolder = { parentFolder: null, folderContent: null, fileContent: null, displayName: 'project-Explorer' }
    data.forEach((item, index) => {
      let idNoSpaces = item.id.replace(/\s/g, '').split(':')
      folderBase = insertToTree(folderBase, idNoSpaces, { lastUpdated: item.lastUpdated })
    })
  
    setFolder(folderBase)
  },
    [])
  return (
    <div className="App">
      {fileFolder !== null ? <div>
        <div className="App-Header">Your folder explorer:</div>
        {fileFolder.parentFolder !== null ? (<div className="Back-Arrow" onClick={() => setFolder(fileFolder.parentFolder)}>&#8629;</div>) : <div className="Root-Folder">Root folder</div>}
        <div className="Folder-Name-Title">Folder name:</div>
        <div className="Folder-Name"> {fileFolder.displayName} </div>
        {(fileFolder.folderContent !== null && fileFolder.folderContent.length > 0) ?
          <div className="Folder-Content">Content:
          <ul>
              {fileFolder.folderContent.map((item, index) => {
                let fileContent = item.fileContent
                if (fileContent === null) {
                  return <li key={index} className="Sub-Folder" onClick={() => {
                    {setFolder(item)}
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
          </div> : null}
      </div> : null}
    </div>
  );
}
export default App;
