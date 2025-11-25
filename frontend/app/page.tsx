"use client";
import { create } from "domain";
import { useEffect, useState } from "react";
import { addProject } from "@/app/lib/projects";
type Project = {
  id: number;
  name: string;
};

const mockdata: Project[] = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
  { id: 4, name: "Project 4" },
  { id: 5, name: "Project 5" },
  { id: 6, name: "Project 6" },
];

export default function Home() {
  useEffect(() => {}, []);

  const projects: Project[] = [];
  const [createProject, setCreateProject] = useState(false);
  const [projectName, setProjectName] = useState("");

  async function handleSubmit() {
    await addProject(projectName);
    setCreateProject(false);
  }

  const handleCreateProject = () => {
    setCreateProject(true);
  }

  const handleCancel = () => {
    setCreateProject(false);
  }

  return (
    <div className="flex min-h-screen justify-center">

      <div className="flex flex-col items-center w-96 relative border-r-2">
        <div className="w-full p-4 text-center border-b-2">
          Projects tab
        </div>

        <div className="flex flex-col overflow-y-scroll w-full">
          {mockdata.map((project) => (
            <div className="p-4 border-b-2" key={project.id}>
              {project.name}
            </div>
          ))}
        </div>
        <button className="p-4 border-b-2" onClick={handleCreateProject}>
          Create project
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full dark-purple-bg">
        {
          createProject && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <form className="flex flex-col items-center justify-center w-full h-full">
                <input
                  className="p-4 border-2"
                  type="text"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <button className="p-4 border-2" type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
              <button className="text-2xl border-2" onClick={handleCancel}>
                X
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
