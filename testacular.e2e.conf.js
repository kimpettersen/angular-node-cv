basePath = './';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  JASMINE,
  JASMINE_ADAPTER,
  'test/vendor/angular-mocks.js',
  'app/components/angular-resource/*.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'test/e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
