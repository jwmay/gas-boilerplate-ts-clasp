/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

export function getConfiguration() {
  return {
    // debug: true,
    debug: false,
    
    applicationType: MimeType.GOOGLE_DOCS,
    // applicationType: MimeType.GOOGLE_SHEETS,
    // applicationType: MimeType.GOOGLE_SLIDES,
    
    pluginName: 'Templater',
    
    defaultOptions: {
      templateFolders: [],
      trashSourceFile: false,
      createInMyDrive: false
    },

    dialog: {
      options: {
        height: 500,
        width: 600
      },
      templates: {
        height: 400,
        width: 600
      }
    },

    pickerDeveloperKey: 'AIzaSyC_YH_-LRRE4SPCx0Pzbcsk5NrYGjs0WNw'
  };
}