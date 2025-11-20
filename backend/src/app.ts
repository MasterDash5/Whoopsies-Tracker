import express, { Request, Response } from "express"
import * as dal from "./dal"

const app = express();
const port: number = 3000;

app.get("/projects", async (req: Request, res: Response) => {
    res.json(await dal.getProjects())
});

app.listen(port, () => {
    console.log("ExpressJS started");
});