const request = require('supertest');
const app = require('..');
const mongoose = require('mongoose');
const { clearDatabase } = require('../db.connection');

const testAgent = request(app);
let user = { name: 'Ali', email: 'ali@test.com', password: '1234' };
let user2 = { name: 'Ahmed', email: 'ahmed@test.com', password: '1234' };
let token, todoId, userId, token2;

describe('lab testing:', () => {
  beforeAll(async () => {
    const resSignup = await testAgent.post('/user/signup').send(user);
    userId = resSignup.body.data._id;
    const resLogin = await testAgent.post('/user/login').send(user);
    token = resLogin.body.data;
    await testAgent.post('/user/signup').send(user2);
    const resLogin2 = await testAgent.post('/user/login').send(user2);
    token2 = resLogin2.body.data;
    const resAddTodo = await testAgent.post('/todo').send({ title: 'eat breakfast' }).set({ authorization: token });
    todoId = resAddTodo.body.data._id;
  });
  afterAll(async () => {
    await clearDatabase();
  });

  describe('users routes:', () => {
    it('GET /user/search :should respond with the correct user with the name requested', async () => {
      // Note: user name must be sent in request query not request params
      let res = await testAgent.get('/user/search').query({ name: 'Ali' });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Ali');
    });
    it('GET /user/search with invalid name :should respond with status 404 and the message', async () => {
      let res = await testAgent.get('/user/search').query({ name: 'ahmed' });
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/There is no user with name: ahmed/i);
    });
  });

  describe('todos routes:', () => {
    it('PATCH /todo/ with id only :should respond with res status 400 and a message', async () => {
      let res = await testAgent.patch(`/todo/${todoId}`).set({ authorization: token });
      expect(res.status).toBe(500);
      expect(res.body.message).toMatch(/Cannot destructure property 'title' of 'req.body' as it is undefined./i);
    });
    it('PATCH /todo/ with id and title :should respond with status 200 and the new todo', async () => {
      let res = await testAgent.patch(`/todo/${todoId}`).send({ title: 'new title' }).set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('new title');
    });

    it("GET  /todo/user :should respond with the user's all todos", async () => {
      let res = await testAgent.get('/todo/user').set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveSize(1);
      expect(res.body.data.every((todo) => todo.userId === userId)).toBe(true);
    });
    it("GET  /todo/user for a user hasn't any todo, :should respond with status 200 and a message", async () => {
      let res = await testAgent.get('/todo/user').set({ authorization: token2 });
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/^Couldn't find any todos for/i);
    });
  });
});
