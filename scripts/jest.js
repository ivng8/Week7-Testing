(function(){

  'use strict';

  const jest = require('jest');
  const config = require('../jest.config');
  const path = require('path');
  const helper = require('./helper');

  const outputDir = path.join(__dirname, '..', 'reports', 'coverage');

  let calcVariant;
  if (process.argv.indexOf('-calcVariant') > -1) {
    calcVariant = process.argv[process.argv.indexOf('-calcVariant') + 1];
  }

  if (calcVariant !== 'control') {
    config.verbose = false;
    config.reporters = ['summary', ['<rootDir>/scripts/jest-custom-reporter', { outputFileName: `${calcVariant}` }]];
  } else {
    helper.clean(outputDir);
    helper.makeDirectories(outputDir);
  }

  jest
    .runCLI(config, [path.resolve(__dirname, '..')])
    .then((success) => {
      process.exit(0);
    })
    .catch((failure) => {
      process.exit(1);
    });

}());