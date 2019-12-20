import { OptionsHandler } from "../../server/options";
import { Display } from "../lib/display/display.server";
import { Service } from "../../server/service";


function getMainDisplay(): Display {
  return MainController.getDisplay();
}


function createFileFromTemplate(fileId: string): { display: Display; fileUrl: string } {
  return MainController.createFile(fileId);
}


class MainController {
  options: {};

  constructor() {
    this.options = OptionsHandler.getOptions();
  }

  private _getFolderDisplay(): string {
    const service = new Service();
    const folders = service.getAllTemplates();
    if (folders.length > 0) {
      let listItems = [];
      folders.forEach(folder => {
        listItems.push(
          `<h3>${folder.name}</h3>`
        );
        listItems.push('<ul>');
        if (folder.files.length > 0) {
          folder.files.forEach(file => {
            listItems.push(
              `<li data-id="${file.id}">${file.name}</li>`
            );
          });
        }
        else {
          listItems.push('<li>No template files found in this folder</li>');
        }
        listItems.push('</ul>');
      });
      return '' +
          '<div class="accordion" id="templateFolders">' +
            listItems.join('') +
          '</div>';
    }
    else {
      return '' +
          '<div class="accordion" id="templateFolders">' +
            '<h3>No template folders selected</h3>' +
          '</div>';
    }
  }

  static getDisplay(): Display {
    const controller = new this();
    return Display.create({
      content: controller._getFolderDisplay()
    });
  }

  static createFile(fileId: string): { display: Display; fileUrl: string } {
    const service = new Service();
    const copy = service.copyTemplateFile(fileId);

    // Return an object containing the display to clear and close the dialog
    // and return the url of the file to open by the client-side handler
    return {
      display: Display.create({
        reset: true,
        close: true
      }),
      fileUrl: copy.url
    };
  }
}