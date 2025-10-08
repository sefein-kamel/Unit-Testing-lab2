const request = require('supertest');
const app = require('..');
const { clearDatabase } = require('../db.connection');
const { default: mongoose } = require('mongoose');
const testAgent = request(app);
describe('todo routes', () => {
  afterAll(async () => {
    await clearDatabase();
  });
  let user = { name: 'Ali', email: 'ali@test.com', password: '1234' };
  let token;
  beforeAll(async () => {
    await testAgent.post('/user/signup').send(user);
    let res = await testAgent.post('/user/login').send(user);
    token = res.body.data;
  });
  it('GET /todo/ :should respond with todos=[]', async () => {
    let res = await testAgent.get('/todo/');
    expect(res.body.data).toHaveSize(0);
    expect(res.status).toBe(200);
  });
  it('POST /todo/ (without token) :should respond 401', async () => {
    let res = await testAgent.post('/todo').send({ title: 'sleep more' });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/login first/);
  });
  it('POST /todo/ (with token) :should respond the new todo', async () => {
    let res = await testAgent.post('/todo').send({ title: 'sleep more' }).set({ authorization: token });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('sleep more');
  });
  it('GET /todo/id (with wrong id) :should respond with 404', async function () {
    let id = new mongoose.Types.ObjectId();
    let res = await testAgent.get('/todo/' + id).set({ authorization: token });
    expect(res.status).toBe(404);
  });
  it('GET /todo/id (with correct id) :should respond with 200', async function () {
    let resAddTodo = await testAgent.post('/todo').send({ title: 'anser the task' }).set({ authorization: token });
    let id = resAddTodo.body.data._id;
    let res = await testAgent.get('/todo/' + id).set({ authorization: token });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('anser the task');
  });
});
