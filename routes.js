const routes = require('next-routes')();

//Route to specified page
routes
    .add('/record/:address','/details')
    .add('/client/:address','/details-client');

module.exports = routes;
