const
    express = require('express'),
    path = require('path');

function errorHandler (err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function contentAt(relativePath) {
    return express.static(path.resolve(__dirname, relativePath));
}

module.exports = express().
    use(errorHandler).
    use(contentAt('./public')).
    use('/todomvc-app-css', contentAt('./../node_modules/todomvc-app-css')).
    use('/todomvc-common', contentAt('./../node_modules/todomvc-common')).
    use('/vue', contentAt('./../node_modules/vue/dist'))
;
