import { Router } from "express"

export const UserRoute = (): Router =>
  Router().get("", (req, res) => {
    res.status(200).send({})
  })
