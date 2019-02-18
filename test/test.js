var request = require('supertest');
var app = require('../index.js');

describe('GET /', function() {

    it('respond with hello world', function(done) {
        this.timeout(1000);
        //navigate to root and check the the response is "hello world"
        request(app)
            .get('/')
            .expect(200, done);            
    });

    it('respond 500', function(done) {
        this.timeout(1000);
        //navigate to root and check the the response is "hello world"
        request(app)
            .get('/bad')
            .expect(500, done);            
    });

    it('respond with 200', function(done) {
        this.timeout(1000);
        //navigate to root and check the the response is "hello world"
        request(app)
            .get('/metrics')
            .expect(200, done);            
    });
});