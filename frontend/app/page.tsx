"use client";
import { useEffect, useState } from "react";
import { addProject, getProjects } from "@/app/lib/projects";
type Project = {
  id: number;
  name: string;
};

export default function Home() {
  const [createProject, setCreateProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjects();
      setProjects(projects);
    }
    fetchProjects();
  }, []);

  async function handleSubmit() {
    await addProject(projectName);
    setCreateProject(false);
    const projects = await getProjects();
    setProjects(projects);
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
          {projects.map((project) => (
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
