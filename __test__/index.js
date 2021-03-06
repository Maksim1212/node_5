process.env.NODE_ENV = 'test';
// ***************************
// * CHECK ALL FILES IS EXISTS
// ***************************
require('./tests/ExistsFiles.test');

// **********
// * SERVICES
// **********
require('./tests/UserService.test.js');
require('./tests/AuthUserService.test.js');

// **************************
// * CONTROLLERS (ROUTES)
// **************************
require('./tests/User.test');
require('./tests/Auth.test');
