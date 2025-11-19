import express, { Request, Response } from "express"
import * as dal from "./dal"

interface Project {
    id: string;
    name: string;
}

interface Issue {
    id: string;
    title: string;
    description: string;
    date: Date;
    commit: string;
    projectId: string; // FK to Project
}

const test = async () => {
    const projects = await dal.getProjects();
    console.log(projects);
};
test();

const app = express();
const port: number = 3000;

app.get("/projects", (req: Request, res: Response) => {
    res.json([

    ])
});

app.listen(port, () => {
    console.log("ExpressJS started");
});