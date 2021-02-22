/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

export function getConfiguration() {
  return {
    debug: true,

    applicationType: MimeType.GOOGLE_DOCS,
    // applicationType: MimeType.GOOGLE_SHEETS,
    // applicationType: MimeType.GOOGLE_SLIDES,

    pluginName: 'PLUGIN_NAME',

    defaultOptions: {
      // set default values of options here
      templateFolders: [],
      trashSourceFile: false,
      createInMyDrive: false,
    },

    dialog: {
      // set dimensions of dialogs here
      settings: {
        height: 500,
        width: 600,
      },
    },

    pickerDeveloperKey: 'GOOGLE_PICKER_DEVELOPER_API_KEY',
  }
}
