import request from 'supertest'
process.env.LOGIN = 'any_login'
process.env.PASSWORD = 'any_password'

import app from '../config/app'

describe('Login Routes', () => {
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await request(app)
        .post('/login')
        .send({
          login: process.env.LOGIN,
          password: process.env.PASSWORD
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/login')
        .send({
          login: 'victormenezes35@gmail.com',
          password: 'teste'
        })
        .expect(401)
    })
  })
})
