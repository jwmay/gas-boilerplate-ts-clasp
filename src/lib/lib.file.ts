import { Application } from './lib.application';


export class BaseFile {
  fileId: string;
  file: GoogleAppsScript.Drive.File;

  constructor(id?: string) {
    this.file = this._getFile(id);
    this.fileId = this.getId(); 
  }

  private _getFile(id?: string) {
    if (id) return DriveApp.getFileById(id);
    return DriveApp.getFileById(Application.getActive().getId());
  }

  getId() {
    return this.file.getId();
  }

  getName() {
    return this.file.getName();
  }

  getUrl() {
    return this.file.getUrl();
  }
  
  getParentFolder() {
    return this.file.getParents().next();
  }
  
  makeCopy(name: string, destination: any) {
    const copy = this.file.makeCopy(name, destination);
    return new BaseFile(copy.getId());
  }

  setTrashed(trashed: boolean) {
    return this.file.setTrashed(trashed);
  }
}