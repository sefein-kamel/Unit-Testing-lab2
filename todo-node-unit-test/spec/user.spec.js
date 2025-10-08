const request = require('supertest');
const app = require('..');
const { clearDatabase } = require('../db.connection');

const testAgent = request(app);
describe('user routes', () => {
  afterAll(async () => {
    await clearDatabase();
  });
  let user = { name: 'Ali', email: 'test@test.com', password: '1234' };

  it('GET /user/ :should respond with users=[]', async () => {
    let res = await testAgent.get('/user/');
    expect(res.body.data).toHaveSize(0);
    expect(res.status).toBe(200);
  });
  it('POST /user/signup :should respond with 201 and the new user', async () => {
    let res = await testAgent.post('/user/signup').send(user);

    expect(res.status).toBe(201);
    expect(res.body.data.email).toEqual(user.email);
    expect(res.body.data.name).toEqual(user.name);
  });
  it('POST /user/login :should respond with token with status=200', async () => {
    let res = await testAgent.post('/user/login').send(user);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});
