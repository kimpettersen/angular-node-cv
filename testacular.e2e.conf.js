basePath = './';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'components/jquery/jquery.js',
  'test/e2e/*.js'
];


// files = [
//   JASMINE,
//   JASMINE_ADAPTER,
//   ANGULAR_SCENARIO,
//   ANGULAR_SCENARIO_ADAPTER,
//   'app/components/angular/angular.js',
//   'test/vendor/angular-mocks.js',
//   'app/components/angular-resource/*.js',
//   'app/scripts/*.js',
//   'app/scripts/**/*.js',
//   // 'app/scripts/controllers/menuCtrl.js',
//   // 'app/scripts/controllers/admin/*.js',
//   'test/e2e/*.js'
// ];

autoWatch = false;

browsers = ['Chrome'];

singleRun = !autoWatch;

urlRoot = '/__testacular__';

proxies = {
  '/': 'http://localhost:3000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
