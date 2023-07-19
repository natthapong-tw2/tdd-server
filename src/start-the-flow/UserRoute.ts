import { Router } from "express"
import { IUserService } from "./UserService"

export const UserRoute = (userService: IUserService): Router =>
  Router().post("", (req, res) => {
    const userId = userService.createUser()
    res.status(201).send({ userId })
  })
