import { BaseFile } from '../lib/lib.file'
import { Configuration } from '../lib/lib.configuration'
import { Options, OptionsHandler } from '../server/options'

export class Service {
  config: {
    debug: boolean
    applicationType: any
    pluginName: string
    defaultOptions: {}
    dialog: { options: { height: number; width: number } }
    pickerDeveloperKey: string
  }
  options: Options

  constructor() {
    this.config = Configuration.getCurrent()
    this.options = OptionsHandler.getOptions()
  }

  // Place functions for performing the main services of your add-on here
}
