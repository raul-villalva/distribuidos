var server = require('../routes');
var supertest = require('supertest');

describe('routes tests ', function() {

    it('add rout should return ok 200 ', function(done) {
        var app = supertest(server);
        app.get('/stats')
           .expect(200, done);
    });

});