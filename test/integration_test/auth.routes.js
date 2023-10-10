const app = require('../../app')
const request = require('supertest')

// Authentication
describe('Base', () => {
  describe('Base route of the application', () => {
    it('respond with json', (done) => {
      return request(app)
        .get('/')
        .expect(200, done())
    })
  })
})

describe('User signUp', () => {
  it('create account for a user that meets all criteraias', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ username: 'Emmanuel', email: 'hilary@gmail.com', password: 't3h' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})

describe('User Login', () => {
  it('should log the user in if account details are correct and return an Access and refresh token upon succcesfull login', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'Emmanuel', password: 't3h' })
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})

describe('User Logout', () => {
  it('log out user and revoke tokens', (done) => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    const refreshToken = '35afb2e-375a-41e7-aa7b-1f8a1088a147'
    request(app)
      .post('/api/v1/auth/logout')
      .send({ refreshToken: `${refreshToken}`, accessToken: `${accessToken}` })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})

describe('new  accessToken', () => {
  it('user shoud get a new AccesToken as response', (done) => {
    request(app)
      .post('/api/v1/auth/refreshToken')
      .send({ refreshToken: 'd35afb2e-375a-41e7-aa7b-1f8a1088a147' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})
