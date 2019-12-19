import { Application } from '../lib/lib.application';
import { Configuration } from '../lib/lib.configuration';
import { PropertyStore } from '../lib/lib.storage';
import { UI } from '../lib/lib.ui.server';


/**
 * Called when an add-on is installed.
 */
function onInstall(e: object) {
  onOpen(e);
}


/**
 * Called when an application that is associated with this add-on is opened.
 * Constructs the plugin menu that is displayed in the 'Add-ons' dropdown
 * availabe in Google Docs, Sheets, or Slides.
 */
function onOpen(e: object) {
  const config = Configuration.getCurrent();

  // Add the plugin add-on menu to the user interface with additional menues
  // available only in debug mode.
  const ui = Application.getUi()
      .createMenu(config.pluginName)
      .addItem('New from template', 'showMainDialog')
      .addSeparator()
      .addItem('Settings', 'showSettingsDialog');
  
  // If debug, display menu options for testing and to clear the
  // property storage.
  if (config.debug) {
    ui.addSeparator()
        .addItem('Clear user properties', 'onClearUserProperties')
        .addItem('Feature test', 'onFeatureTest');
  }
  
  ui.addToUi();
}


function showMainDialog() {
  const config = Configuration.getCurrent();
  UI.showDialog('src/ui/main/main.view',
      config.dialog.templates.width,
      config.dialog.templates.height,
      'Select a template');
}


function showSettingsDialog() {
  const config = Configuration.getCurrent();
  UI.showDialog('src/ui/options/options.view',
      config.dialog.options.width,
      config.dialog.options.height,
      'Settings');
}


/**
 * Clears the user properties storage.
 * This function is only available in debug mode.
 */
function onClearUserProperties() {
  let storage = new PropertyStore();
  storage.clean();
}


// test feature here
function onFeatureTest() {
  // test stuff
}