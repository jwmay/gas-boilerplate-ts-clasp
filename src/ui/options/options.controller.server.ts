import { Options, OptionsHandler } from '../../server/options';
import { Display } from '../lib/display/display.server';


function getOptionsDisplay(): Display {
  return OptionsController.getDisplay();
}


function saveOptions(options: object) {
  OptionsController.saveOptions(options);
}


class OptionsController {
  options: Options;

  constructor() {
    this.options = OptionsHandler.getOptions();
  }

  private _getFolderOptionsDisplay(): string {
    const folders = this.options.templateFolders;
    let listItems = '';

    folders.forEach(function(folder: object) {
      if (folder.id) {
        folder.name = DriveApp.getFolderById(folder.id).getName();
        listItems += '<li data-id="' + folder.id + '"><a href="' + folder.url + '" target="_blank">' + folder.name + '</a></li>';
      }
    });

    return '' +
        '<h3>Template Folders</h3>' +
        '<div class="form-group">' +
          '<ul id="templateFolders" class="action-list">' +
            listItems +
          '</ul>' +
          '<input type="button" class="btn" value="Add folders" id="openFolderPicker" onclick="openFolderPicker()">' +
        '</div>';
  }
  
  private _getFileOptionsDisplay(): string {
    const selected = {
      trashSourceFile: (this.options.trashSourceFile ? 'checked' : ''),
      createInMyDrive: (this.options.createInMyDrive ? 'checked' : ''),
    };
    return '' +
        '<form>' +
          '<h3>File options</h3>' +
          '<div class="form-group">' +
            '<div class="form-check">' +
              '<input class="form-check-input" type="checkbox" name="trashSourceFile" id="trashSourceFile" ' + selected.trashSourceFile + '>' +
              '<label class="form-check-label" for="trashSourceFile">' +
                'Place current file in trash' +
                '<span class="help-text">Once the template file is created, this file will be placed in the trash.</span>' +
              '</label>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="form-check">' +
              '<input class="form-check-input" type="checkbox" id="createInMyDrive" ' + selected.createInMyDrive + '>' +
              '<label class="form-check-label" for="createInMyDrive">' +
                'Create new file in <em>My Drive</em>' +
                '<span class="help-text">' +
                  'The new file created from the selected template will be created in the same folder as this file. ' +
                  'Check this box to have the new file created in your My Drive folder.' +
                '</span>' +
              '</label>' +
            '</div>' +
          '</div>' +
        '</form>';
  };
  
  private _getSaveOptionsDisplay(): string {
    return '' +
        '<div class="btn-bar">' +
          '<input type="button" class="btn action" value="Save" onclick="saveOptions()">' +
          '<input type="button" class="btn" value="Cancel" onclick="cancelOptions()">' +
        '</div>';
  }
  
  static getDisplay(): Display {
    const controller = new this();
    let content = [
      controller._getFolderOptionsDisplay(),
      controller._getFileOptionsDisplay(),
      controller._getSaveOptionsDisplay()
    ];
    return Display.create({
      content: content.join(''),
      type: 'card',
      id: 'optionsDisplay',
      position: 'bottom',
      reset: true
    });
  }

  static saveOptions(options: object) {
    let opts = new OptionsHandler();
    for (let option in options) {
      opts.setOption(option, options[option]);
    }
  }
}