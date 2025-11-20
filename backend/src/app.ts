import express, { Request, Response } from "express"
import * as dal from "./dal"

const app = express();
const port: number = 3000;

app.get("/projects", async (req: Request, res: Response) => {
    res.json(await dal.getProjects())
});

app.get("/project/:id", async (req: Request, res: Response) => {
    res.json(await dal.getProject(req.params.id))
});

app.post("/project", async (req: Request, res: Response) => {
    await dal.addProject({
        id: 0, // ignored
        name: req.body.name
    });
});

app.get("/issues/:project_id", async (req: Request, res: Response) => {
    res.json(await dal.getIssues(req.params.project_id));
});

app.get("/issue/:id", async (req: Request, res: Response) => {
    res.json(await dal.getIssue(req.params.id));
});

app.post("/issue", async (req: Request, res: Response) => {
    await dal.addIssue({
        id: 0, // ignored
        project_id: req.body.project_id,
        created_at: 0, // ignored
        resolved_at: null,
        status: 0,
        title: req.body.title,
        description: req.body.description,
        commit: req.body.commit
    });
});

app.put("/issue/:id", async (req: Request, res: Response) => {
    await dal.setIssue({
        id: req.body.id,
        project_id: req.body.project_id,
        created_at: 0, // ignored
        resolved_at: req.body.resolved_at,
        status: req.body.status,
        title: req.body.title,
        description: req.body.description,
        commit: req.body.commit
    });
});

app.listen(port, () => {
    console.log("ExpressJS started");
});