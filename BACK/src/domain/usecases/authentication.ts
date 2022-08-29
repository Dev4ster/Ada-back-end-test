export interface AuthenticationParams {
  login: string
  password: string
}

export interface Authentication {
  auth: ({ login, password }: AuthenticationParams) => Promise<string | Error>
}
