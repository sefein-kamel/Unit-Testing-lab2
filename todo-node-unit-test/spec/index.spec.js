const request = require('supertest');
const app = require('..');

const testAgent=request(app)
describe("root routes",()=>{
    it("GET / :should respond with todos=[]",async ()=>{
       let res= await testAgent.get("/")
       expect(res.body.data).toHaveSize(0)
    })
    it("GET /xxx :should respond with 404 'Not found'",async ()=>{
       let res=await testAgent.get("/xxx")
       expect(res.status).toBe(404)
       expect(res.body.message).toMatch(/not found/i)
    })
})