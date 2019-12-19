import { getConfiguration } from '../server/main';

export class Configuration {
  static getCurrent() {
    if (typeof getConfiguration === 'undefined') {
      throw 'You must provide an implementation of getConfiguration' +
          'to use this configuration library.';
    }
    return getConfiguration();
  }
}