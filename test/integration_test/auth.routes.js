const app = require('../../app');
const request = require('supertest');

//Authentication
describe('POST /signup', ()=>{
    it("create a new user account if all criteria is met", ()=>{
        return request(app)
        .post()
        .send()
        .set()
        .expect()
        .expect()
    })
})


describe(' POST /signin', ()=>{
    it("should log the user in if account details are correct and return an Access and refresh token upon succcesfull login", ()=>{
        return request(app)
        .post()
        .send()
        .auth()
        .expect()
    })
})

describe(' POST /signout', ()=>{
    it()
})