const app = require('../../app');
const request = require('supertest');

describe("POST /createNote ", ()=>{ //Note creation Test
    describe("Note Creation",()=>{
        it("Create Note for Authenticated user", ()=>{
           return  request(app)
            .post('/users/notes/creatnote')
            .set('Accept', 'application/json')
            .send({title:"12-10-90", note : "i will get a new phone", image:"blackberry090", audio_note : "" })
            .expect(201)

        })
    })
})

describe("POST /list-note ", ()=>{ //Account creation Test
    describe("Note Retrieval",()=>{
        it("Retrieve all  Note for the Authenticated user", ()=>{
           return  request(app)
            .post('/users/notes/list-note')
            .expect(200)

        })
    })
})