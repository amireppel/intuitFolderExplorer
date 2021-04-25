import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data'
import {insertToTree, FileFolder} from './foldersGeneartor'
import FolderContent from './folderContent'
interface Props {
  data: Array<any>
 

}
function App(props:Props) {
  const [fileFolder, setFolder] = useState<FileFolder | null>(null)

  
  useEffect(() => {
    /*default root folder*/
    let folderBase: FileFolder = { parentFolder: null, folderContent: null, fileContent: null, displayName: 'projectExplorer' }

    props.data.forEach((item, index) => {
      let idNoSpaces = item.id.replace(/\s/g, '').split(':')
      folderBase = insertToTree(folderBase, idNoSpaces, { lastUpdated: item.lastUpdated })
    })

    setFolder(folderBase)
  },
    [props.data])
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
        <div className="App-Header">Folders Explorer</div>
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
         <FolderContent setFolder={setFolder} folderContent={fileFolder.folderContent}/>
          : null}
      </div> : null}

    </div>
  );
}
export default App;
