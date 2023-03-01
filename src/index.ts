import express, {NextFunction, Request, Response} from "express"

const handleToggle = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("authorization")
  if(authorization === "abc") {
    next()
  } else {
    res.status(404).send([])
  }
}

const app = express()
app
  .get("/health-check", (req, res) => {
    res.status(200).send({})
  })
  .get("/users", (req, res) => {
    res.status(200).send([])
  })
  .get("/shops", (req, res) => {
    res.status(200).send([])
  })
  .post("/financial-planner",
    handleToggle,
    (req, res) => {
      res.status(200).send([])
    }
  )
  .listen(8080, () => {
    console.log("server started at http://localhost:8080")
  })