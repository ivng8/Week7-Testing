(async function(){

  'use strict';

  const path = require('path');
  const spawn = require('child_process').spawn;
  const fs = require('fs');
  const logger = require('./funky-logger');

  const outputDir = path.join(__dirname, '..', 'reports', 'coverage');
  
  function spawnProcess(cmd, args) {
    return new Promise((resolve, reject) => {
      const options = { cwd: path.resolve(__dirname, '..'), shell: true };

      const child = spawn(cmd, args, options);

      child.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      child.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      child.on('close', (code) => {
        code === 0 ? resolve() : reject();
      });

    });
  }

  const controlSummary = JSON.parse(fs.readFileSync(path.resolve(outputDir, 'control.json'), 'utf8'));
  if (controlSummary.numFailedTests > 0) {
    console.log(logger.color('red', '\nTests failed on control (non-bugy) calculator. Fix failing tests to run on buggy variants. \n'));
    process.exit(0);
  }

  console.log(logger.color('cyan', 'All tests pass on control. Running tests on buggy variants'));

  const buggyVariants = ['bug1', 'bug2', 'bug3', 'bug4', 'bug5', 'bug6', 'bug7']

  await Promise.all(buggyVariants.map(variant => 
    spawnProcess('node', ['scripts/jest.js', '-calcVariant', variant])
  ));

  console.log(logger.color('green', 'Tests executed on all buggy variants'));

}());