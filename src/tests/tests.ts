import { Configuration } from '../lib/lib.configuration';
import { Application } from '../lib/lib.application';
import { OptionsHandler } from '../server/options';


function runTests() {
  let tests = new Tests();
  tests.run();
}


class Tests {
  tests = [
    function configuration() {
      Tests.getDisplay('Configuration class', Configuration.getCurrent());
    },

    function application() {
      Tests.getDisplay('Application class', Application.getType());
    },
    
    function defaultOptions() {
      let options = new OptionsHandler();
      Tests.getDisplay('Default options', options.defaultOptions);
    },

    function options() {
      Tests.getDisplay('Options', OptionsHandler.getOptions());
    },
  ];

  run() {
    this.tests.forEach(test => test());
  }
  
  static getDisplay(title: string, data: any) {
    let output = [
      '',
      '~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~',
      'TEST: ' + title,
      '   ' + JSON.stringify(data),
      '~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~',
      ''
    ];
    Logger.log(output.join('\n'));
  }
}
