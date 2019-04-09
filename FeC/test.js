var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var request = require('supertest');
var mocha = require('mocha')

chai.use(chaiHttp)
chai.use(require('chai-things'))



  describe('/find/', function () {
    // Write your tests here!
    it('succeeds silently!', function() {  
      chai.request('/find/')
      .get('/3222+State+Rt+11%2C+Malone+NY+12953')
      .end(function(err, res) {
        expect(res).to.have.status(200);
      });
    });

  });

  describe('/contact', function () {
    it('succeeds silently!', function() {  
      chai.request('/contact')
      .get('/Neha+Adams/message')
      .end(function(err, res) {
        expect(res).to.have.status(404);
      });
    });

  });
