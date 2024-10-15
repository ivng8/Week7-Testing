(function() {

  'use strict';

  const fs = require('fs');
  const path = require('path');
  const logger = require('./funky-logger');

  const outputDir = path.resolve(__dirname, '..', 'reports', 'coverage');
  const buggyVariants = ['bug1', 'bug2', 'bug3', 'bug4', 'bug5', 'bug6', 'bug7'];
  const gradeScopeOutput = {
    tests: []
  };
  let count = 0;

  const controlSummary = JSON.parse(fs.readFileSync(path.resolve(outputDir, 'control.json'), 'utf8'));
  if (controlSummary.numFailedTests > 0) {

    buggyVariants.forEach(variant => {
      gradeScopeOutput.tests.push({
        score: 0,
        name: variant,
        output: `Tests failed on control implementation`,
        status: "failed"
      });
    });

    console.log(logger.color('red', '\tFix failing tests to run on buggy implementations.'));
    console.log(logger.color('red', `\tCurrent Grade: ${count}/7 (${(count/7)*100}%)\n`));

    fs.writeFileSync(path.resolve(outputDir, 'gradeScopeOutput.json'), JSON.stringify(gradeScopeOutput), 'utf8');
    process.exit(1);
  }

  console.log(logger.color('magenta', '\n\tSummary: \n'));
  console.log(logger.color('yellow', '\t\tVariant\t| pass\t| fail\t| total\t| bug found'));
  console.log('\t\t--------------------------------------------');
  console.log(logger.color('cyan', `\t\tControl\t| ${controlSummary.numPassedTests}\t| ${controlSummary.numFailedTests}\t| ${controlSummary.numTotalTests}\t| - `));
  
  buggyVariants
    .map(variant => JSON.parse(fs.readFileSync(path.resolve(outputDir, `${variant}.json`), 'utf8')))
    .forEach(summary => {
      
      gradeScopeOutput.tests.push({
        score: (summary.numFailedTests > 0) ? (100/7) : 0,
        name: summary.variant,
        // output: (rep.status === "passed") ? `${rep.fullName} -> OK` : `${rep.fullName} -> Test failed with: ${rep.failureMessages}`,
        output: `Failing tests: ${summary.numFailedTests}`,
        status: (summary.numFailedTests > 0) ? "passed" : "failed"
      });

      if(summary.numFailedTests > 0) {
        count++;
        console.log(logger.color('green', `\t\t${summary.variant}\t| ${summary.numPassedTests}\t| ${summary.numFailedTests}\t| ${summary.numTotalTests}\t| yes `));
      } else {
        console.log(logger.color('red', `\t\t${summary.variant}\t| ${summary.numPassedTests}\t| ${summary.numFailedTests}\t| ${summary.numTotalTests}\t| no `));
      }
    });

  console.log('\n')
  switch(count) {
    case 0:
      console.log(logger.color('magenta', '\tNo Known bugs found yet. Keep trying.'));
      break;
    case 1:
      console.log(logger.color('magenta', '\tFirst Blood!!'));
      console.log(logger.color('yellow', '\t1 bug found.'));  
      break;
    case 2:
      console.log(logger.color('magenta', '\tDouble Kill!!'));
      console.log(logger.color('yellow', '\t2 bugs found.'));  
      break;
    case 3:
      console.log(logger.color('magenta', '\tKilling Spree!!'));
      console.log(logger.color('yellow', '\t3 bugs found.'));  
      break;
    case 4:
      console.log(logger.color('magenta', '\tRampage!!'));
      console.log(logger.color('yellow', '\t4 bugs found.'));  
      break;
    case 5:
      console.log(logger.color('magenta', '\tUnstoppable!!'));
      console.log(logger.color('yellow', '\t5 bugs found.'));  
      break;
    case 6:
      console.log(logger.color('magenta', '\tDominating!!'));
      console.log(logger.color('yellow', '\t6 bugs found.'));  
      break;
    case 7:
      console.log(logger.color('magenta', '\tGodlike!!'));
      console.log(logger.color('yellow', '\t7 bugs found.'));  
      break;
    default:
      console.log(logger.color('magenta', '\tLegendary!!'));
      console.log(logger.color('yellow', '\tHonestly, I don\'t know how you got here.'));  
      break;
  }

  console.log(logger.color('cyan', `\tCurrent Grade: ${count}/7 (${(count/7)*100}%)\n`));

  fs.writeFileSync(path.resolve(outputDir, 'gradeScopeOutput.json'), JSON.stringify(gradeScopeOutput), 'utf8');

}());