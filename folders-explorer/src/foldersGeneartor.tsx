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

const insertToTree = (parentFolder: FileFolder,
    foldersList: Array<string>, content: FileContent | null): FileFolder => {
    /*when reaching last name in the list, its the file name the inserting the file and return
    */
    let currentName = '';
    currentName = foldersList.shift() || ''
    currentName = currentName.trim()
    if (parentFolder.folderContent === null) {
      parentFolder.folderContent = []
    }

    if (foldersList.length === 0) {
      /*inserting the file itself*/
      let newFile = {
        parentFolder: parentFolder, displayName: currentName, fileContent: content,
        folderContent: null
      }
      parentFolder.folderContent.push(newFile)
    }
    else {
      /*inserting or updating a folder*/
      let folder = parentFolder.folderContent.find(folder => folder.displayName === currentName)
      if (folder === undefined) {
        folder = { parentFolder: parentFolder, displayName: currentName, fileContent: null, folderContent: [] }
        parentFolder.folderContent.push(folder)
      }
      insertToTree(folder, foldersList, content)
    }
    return parentFolder
  }

  export { insertToTree}
  export type {FileFolder}