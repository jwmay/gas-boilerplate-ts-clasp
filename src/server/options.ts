import { Configuration } from '../lib/lib.configuration';
import { PropertyStore } from '../lib/lib.storage';


export interface Options {
  templateFolders: object[];
  trashSourceFile: boolean;
  createInMyDrive: boolean;
};


/**
 * Class for handling and storing user-defined script options.
 */
export class OptionsHandler {
  storage: PropertyStore;
  defaultOptions: Options;
  
  constructor() {
    this.storage = new PropertyStore();
    this.defaultOptions = this._getDefaultOptions();
  }

  /**
   * Returns an object containing the values for the default options.
   */
  _getDefaultOptions(): Options {
    let config = Configuration.getCurrent();
    return config.defaultOptions;
  }

  /**
   * Returns the value of the given option, or the default value.
   */
  getOption(option: string) {
    let property = this.storage.getProperty(option);
    return (property !== null ? property : this.defaultOptions[option]);
  }
  
  /**
   * Sets the given option to the given value.
   */
  setOption(option: string, value: any) {
    this.storage.setProperty(option, value);
  }

  /**
   * Returns an object containing the values of all options.
   */
  static getOptions(): Options {
    let opts = new OptionsHandler();
    let options = opts.defaultOptions;
    for (let option in opts.defaultOptions) {
      options[option] = opts.getOption(option);
    }
    return options;
  }
}