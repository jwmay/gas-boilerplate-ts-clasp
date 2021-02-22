/**
 * An object for assisting with the storage of data in
 * the user properties of a Google Apps Script.
 */
export class PropertyStore {
  store: GoogleAppsScript.Properties.Properties

  constructor() {
    this.store = PropertiesService.getUserProperties()
  }

  /**
   * Sets a property with the given key and value.
   */
  setProperty(key: string, value: any): void {
    this.store.setProperty(key, JSON.stringify(value))
  }

  /**
   * Gets a property with the given key.
   */
  getProperty(key: string): any {
    return JSON.parse(this.store.getProperty(key))
  }

  /**
   * Deletes all properties in the current properties store.
   */
  clean() {
    this.store.deleteAllProperties()
  }
}
