import { Configuration } from "../../../lib/lib.configuration";

function initFolderPicker() {
  const config = Configuration.getCurrent();
  return {
    locale: 'en',
    token: ScriptApp.getOAuthToken(),
    parentFolder: DriveApp.getRootFolder().getId(),
    developerKey: config.pickerDeveloperKey,
    dialogDimensions: {
      width: config.dialog.options.width,
      height: config.dialog.options.height
    },
    picker: {
      includeFolders: true,
      allowFolderSelect: true,
      multiselectEnabled: true,
      // enableDrives: true, // DISABLED
      selectableMimeTypes: MimeType.FOLDER,
      mineOnly: false,
      hideTitle: true,
      navhidden: true,
      callback: 'folderSelected',
    }
  };
}