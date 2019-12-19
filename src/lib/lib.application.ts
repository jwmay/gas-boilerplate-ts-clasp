import { Configuration } from './lib.configuration';

export class Application {

  public static getType() {
    let config = Configuration.getCurrent();
    return config.applicationType;
  }

  public static getApp() {
    let type = this.getType();
    switch(type) {
      case MimeType.GOOGLE_DOCS:
        return DocumentApp;
        break;
      case MimeType.GOOGLE_SHEETS:
        return SpreadsheetApp;
        break;
      case MimeType.GOOGLE_SLIDES:
        return SlidesApp;
        break;
      default:
        throw 'An incorrect application type was specified. Only Google Docs, ' +
            'Sheets, and Slides are supported.';
    }
  }

  public static getUi() {
    return this.getApp().getUi();
  }

  public static getActive() {
    let type = this.getType();
    let app = this.getApp();
    switch(type) {
      case MimeType.GOOGLE_DOCS:
        return app.getActiveDocument();
        break;
      case MimeType.GOOGLE_SHEETS:
        return app.getActiveSpreadsheet();
        break;
      case MimeType.GOOGLE_SLIDES:
        return app.getActivePresentation();
        break;
    }
  }
}