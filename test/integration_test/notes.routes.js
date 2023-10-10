const app = require('../../app')
const request = require('supertest')
describe('create-note', () => {
  it('should create a Note for an Authenticated User', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    const formData = {
      title: 'Testing',
      note: 'Api'
    }
    request(app)
      .post('/users/notes/create-note')
      .set('authorization', `${token}`)
      .send(formData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        done()
      })
  })
})

describe('get all notes', () => {
  it('should get all Notes associated to the Authenticated User', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .get('/users/notes/list-notes')
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('search for a note', () => {
  it('should  search for an authenticated user note', (done) => {
    const query = 'Test'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .get(`/users/notes/search?searchQuery=${query}`)
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Read Note', () => {
  it('should  let   an authenticated user read his/her note', (done) => {
    const noteId = 12
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .get(`/users/notes/readnote/${noteId}`)
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Note  Update', () => {
  it('should let and authenticated user update his/her note', (done) => {
    const noteId = 12
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .put(`/users/notes/updatenotes/${noteId}`)
      .set('authorization', `${token}`)
      .send({ title: 'Prisoner', note: 'by Lucky Dube' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Note Deletion', () => {
  it('should  delete  an authenticated user note soft deletion', (done) => {
    const noteId = 11
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .delete(`/users/notes/deletenotes/${noteId}`)
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Trash', () => {
  it('should view Authenticated User Trash', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .get('/users/notes/trash')
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Delete Note From Trash', () => {
  it('should  delete  an authenticated user note from trash hard deletion', (done) => {
    const noteId = 12
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .delete(`/users/notes/trash/delete/${noteId}`)
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Restore Note From Trash', () => {
  it('should  restore  an authenticated user note from trash', (done) => {
    const noteId = 11
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .get(`/users/notes/trash/restore/${noteId}`)
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})

describe('Empty  Trash', () => {
  it('should  empty the authenticated user trash hard deletion', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5Njk0NjA3NCwiZXhwIjoxNjk2OTQ5Njc0fQ.idaB_3Ko7y_QWnVeHQPfX6aeKMPyrSZYx7R7uYCKyjQ'
    request(app)
      .delete('/users/notes/trash/empty-trash')
      .set('authorization', `${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log('notes', res.body)
        done()
      })
  })
})
