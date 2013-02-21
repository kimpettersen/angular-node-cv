basePath = './';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  JASMINE,
  JASMINE_ADAPTER,
  'test/vendor/angular-mocks.js',
  'app/components/angular/angular.js',
  'app/components/angular-resource/*.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'app/scripts/controllers/menuCtrl.js',
  'app/scripts/controllers/admin/*.js',
  'test/e2e/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

singleRun = !autoWatch;

proxies = {
  '/': 'http://localhost:3000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
