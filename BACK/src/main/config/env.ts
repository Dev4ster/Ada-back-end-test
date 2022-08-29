import dotenv from 'dotenv'
dotenv.config()
export default {
  port: process.env.APP_PORT ?? 5000,
  jwtSecret: process.env.JWT_SECRET ?? 'Tsjdh&ˆ&$#',
  password: process.env.PASSWORD ?? 'any_password',
  login: process.env.LOGIN ?? 'any_login'
}
