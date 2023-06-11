import { NextFunction, Request, Response } from "express"

export const handleToggle = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("authorization")
  if (authorization === "abc") {
    next()
  } else {
    res.status(404).send([])
  }
}
