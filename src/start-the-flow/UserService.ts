export type User = {
  id: string
  name: string
}

export type IUserService = {
  getUsers: () => User[]
  createUser: () => string
}

export const UserService = (): IUserService => ({
  getUsers: () => [{ id: "1", name: "John Smith" }],
  createUser: () => "",
})
