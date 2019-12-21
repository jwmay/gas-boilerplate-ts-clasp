import { BaseFile } from '../lib/lib.file';
import { Configuration } from '../lib/lib.configuration';
import { Options, OptionsHandler } from '../server/options';


export class Service {
  config: { debug: boolean; applicationType: any; pluginName: string; defaultOptions: { templateFolders: any[]; trashSourceFile: boolean; createInMyDrive: boolean; }; dialog: { options: { height: number; width: number; }; templates: { ...; }; }; pickerDeveloperKey: string; };
  options: Options;

  constructor() {
    this.config = Configuration.getCurrent();
    this.options = OptionsHandler.getOptions();
  }

  getTemplateFolders(): GoogleAppsScript.Drive.Folder[] {
    const folders = this.options.templateFolders;
    let driveFolders = [];
    folders.forEach(folder => {
      driveFolders.push(DriveApp.getFolderById(folder.id));
    });
    return driveFolders;
  }
  
  getTemplateFiles(folderId: string): GoogleAppsScript.Drive.FileIterator {
    return DriveApp
        .getFolderById(folderId)
        .getFilesByType(this.config.applicationType);
  }
  
  getAllTemplates() {
    const folders = this.options.templateFolders;
    if (folders.length > 0) {
      let items = [];
      folders.forEach(folder => {
        let folderItem = {
          name: DriveApp.getFolderById(folder.id).getName(),
          id: folder.id,
          url: folder.url,
          files: []
        };
        let files = this.getTemplateFiles(folder.id);
        while (files.hasNext()) {
          let file = files.next();
          folderItem.files.push({
            name: file.getName(),
            id: file.getId(),
            url: file.getUrl()
          });
        }
        items.push(folderItem);
      });
      return items;
    }
    return [];
  }
  
  copyTemplateFile(id: string) {
    const sourceFile = new BaseFile();
    const templateFile = new BaseFile(id);

    // Set the name of the file copied from the template file
    let name = `Copy of ${templateFile.getName()}`;
    
    // Set the destination for the copied file, based on user option
    let dest = (this.options.createInMyDrive ? DriveApp.getRootFolder() : sourceFile.getParentFolder());
    
    // Create the copy of the template file
    let copy = templateFile.makeCopy(name, dest);
    
    // Trash the source file, if option is set
    if (this.options.trashSourceFile) sourceFile.setTrashed(true);

    return {
      name: copy.getName(),
      id: copy.getId(),
      url: copy.getUrl()
    };
  }
}